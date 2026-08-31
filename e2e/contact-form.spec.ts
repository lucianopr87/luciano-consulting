import { test, expect } from '@playwright/test';

test('submits the contact form and shows a success message', async ({ page }) => {
  await page.route('https://api.web3forms.com/submit', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Email sent' }),
    });
  });

  await page.goto('/');
  await page.getByLabel('Nombre').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Contame sobre tu proyecto').fill('This is a test message from Playwright.');
  await page.getByRole('button', { name: 'Enviar mensaje' }).click();

  await expect(page.locator('.form-status')).toContainText('¡Gracias!');
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
