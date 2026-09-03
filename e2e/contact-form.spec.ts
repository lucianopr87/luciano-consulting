import { test, expect } from '@playwright/test';

test('submits the contact form, shows a success message, and fires a GA4 lead event', async ({ page }) => {
  await page.route('https://api.web3forms.com/submit', async (route) => {
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
  await page.getByLabel('Nombre').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Contame sobre tu proyecto').fill('This is a test message from Playwright.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.locator('.form-status')).toContainText('¡Gracias!');

  const gtagCalls = await page.evaluate(() => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls);
  expect(gtagCalls).toContainEqual(['event', 'generate_lead']);
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
  await page.getByLabel('Nombre').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Contame sobre tu proyecto').fill('This is a test message from Playwright.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.locator('.form-status')).toContainText('Hubo un error');
});
