import { test, expect } from '@playwright/test';

test('home (es) renders the CV sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Luciano Perez Ruiz/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Perez Ruiz');
  for (const id of ['profile', 'experience', 'skills', 'education', 'blog', 'booking', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.locator('#experience article')).toHaveCount(6);
});

test('home (en) loads with English copy', async ({ page }) => {
  await page.goto('/en/');
  await expect(page).toHaveTitle(/Luciano Perez Ruiz/);
  await expect(page.getByRole('heading', { name: 'From developer to IT project leader.' })).toBeVisible();
});

test('CV download links point to the PDF', async ({ page }) => {
  await page.goto('/');
  const cv = page.getByRole('link', { name: /Descargar CV/ }).first();
  await expect(cv).toHaveAttribute('href', '/Luciano_Perez_Ruiz_CV_EN.pdf');
  const response = await page.request.get('/Luciano_Perez_Ruiz_CV_EN.pdf');
  expect(response.ok()).toBe(true);
});

test('unknown routes render the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
});
