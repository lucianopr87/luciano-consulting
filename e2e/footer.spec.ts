import { test, expect } from '@playwright/test';

test('shows the copyright text with the current year', async ({ page }) => {
  await page.goto('/');
  const year = new Date().getFullYear().toString();
  const footer = page.locator('footer');
  await expect(footer).toContainText('Luciano Perez Ruiz');
  await expect(footer).toContainText(year);
});

test('privacy link is present, correct, and reachable in both locales', async ({ page }) => {
  await page.goto('/');
  const esLink = page.locator('footer').getByRole('link', { name: 'Política de Privacidad' });
  await expect(esLink).toHaveAttribute('href', '/privacy/');
  await esLink.click();
  await expect(page).toHaveURL(/\/privacy\/$/);
  await expect(page.getByRole('heading', { name: 'Política de Privacidad' })).toBeVisible();

  await page.goto('/en/');
  const enLink = page.locator('footer').getByRole('link', { name: 'Privacy Policy' });
  await expect(enLink).toHaveAttribute('href', '/en/privacy/');
  await enLink.click();
  await expect(page).toHaveURL(/\/en\/privacy\/$/);
  await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
});
