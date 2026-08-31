import { test, expect } from '@playwright/test';

test('home (es) loads with expected content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Luciano Perez Ruiz/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('#services')).toBeVisible();
});

test('home (en) loads with expected content', async ({ page }) => {
  await page.goto('/en/');
  await expect(page).toHaveTitle(/Luciano Perez Ruiz/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('language switcher toggles locale', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/$/);
  await page.getByRole('link', { name: 'ES', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
});

test('privacy pages are reachable from the footer in both locales', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Política de Privacidad' }).click();
  await expect(page).toHaveURL(/\/privacy\/$/);
  await expect(page.getByRole('heading', { name: 'Política de Privacidad' })).toBeVisible();

  await page.goto('/en/');
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  await expect(page).toHaveURL(/\/en\/privacy\/$/);
  await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
});

test('unknown routes render the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByText('404')).toBeVisible();
});
