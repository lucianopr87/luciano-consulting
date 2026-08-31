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

test('unknown routes render the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByText('404')).toBeVisible();
});
