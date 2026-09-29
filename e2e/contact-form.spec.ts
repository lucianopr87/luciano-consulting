import { test, expect } from '@playwright/test';

test('submits the contact form with the chosen reasons, shows the thank-you card, and fires a GA4 lead event', async ({ page }) => {
  let postedBody = '';
  await page.route('https://api.web3forms.com/submit', async (route) => {
    postedBody = route.request().postDataBuffer()?.toString('utf-8') ?? '';
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Email sent' }),
    });
  });

  await page.goto('/');
  await page.evaluate(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void; __gtagCalls: unknown[][] };
    const original = w.gtag;
    w.__gtagCalls = [];
    w.gtag = (...args: unknown[]) => {
      w.__gtagCalls.push(args);
      original?.(...args);
    };
  });

  const contact = page.locator('#contact');
  await contact.getByLabel('Nombre').fill('Test User');
  await contact.getByLabel('Email').fill('test@example.com');

  const consulting = contact.getByRole('button', { name: 'Consultoría' });
  const mobileApp = contact.getByRole('button', { name: 'App mobile' });
  await consulting.click();
  await mobileApp.click();
  await expect(consulting).toHaveAttribute('aria-pressed', 'true');
  await expect(consulting).toContainText('✓');
  // Toggling twice deselects.
  await contact.getByRole('button', { name: 'Desarrollo' }).click();
  await contact.getByRole('button', { name: 'Desarrollo' }).click();
  await expect(contact.getByRole('button', { name: 'Desarrollo' })).toHaveAttribute('aria-pressed', 'false');

  await contact.getByLabel('Mensaje').fill('This is a test message from Playwright.');
  await contact.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(contact.locator('.contact-success')).toContainText('Gracias, mensaje enviado.');
  await expect(contact.locator('.contact-form')).toBeHidden();
  expect(postedBody).toContain('name="motivos"');
  expect(postedBody).toContain('Consultoría, App mobile');
  expect(postedBody).not.toContain('Desarrollo');

  const gtagCalls = await page.evaluate(() => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls);
  expect(gtagCalls).toContainEqual(['event', 'generate_lead']);

  await contact.getByRole('button', { name: 'Enviar otro mensaje' }).click();
  await expect(contact.locator('.contact-form')).toBeVisible();
  await expect(consulting).toHaveAttribute('aria-pressed', 'false');
});

test('reasons are optional', async ({ page }) => {
  await page.route('https://api.web3forms.com/submit', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })
  );

  await page.goto('/');
  const contact = page.locator('#contact');
  await contact.getByLabel('Nombre').fill('Test User');
  await contact.getByLabel('Email').fill('test@example.com');
  await contact.getByLabel('Mensaje').fill('No reasons picked.');
  await contact.getByRole('button', { name: 'Enviar mensaje' }).click();
  await expect(contact.locator('.contact-success')).toBeVisible();
});

test('shows an error message when the submission fails', async ({ page }) => {
  await page.route('https://api.web3forms.com/submit', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ success: false }),
    });
  });

  await page.goto('/');
  const contact = page.locator('#contact');
  await contact.getByLabel('Nombre').fill('Test User');
  await contact.getByLabel('Email').fill('test@example.com');
  await contact.getByLabel('Mensaje').fill('This is a test message from Playwright.');
  await contact.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(contact.locator('.form-status')).toContainText('Hubo un error');
  await expect(contact.locator('.contact-form')).toBeVisible();
});
