import { test, expect } from '@playwright/test';

test('home (es) renders the CV sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Luciano Perez Ruiz/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Perez Ruiz');
  for (const id of ['profile', 'experience', 'skills', 'education', 'blog', 'booking', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.locator('#experience article')).toHaveCount(7);
});

test('home (en) loads with English copy', async ({ page }) => {
  await page.goto('/en/');
  await expect(page).toHaveTitle(/Luciano Perez Ruiz/);
  await expect(page.getByRole('heading', { name: 'From developer to IT project leader.' })).toBeVisible();
});

test('CV download links point to the PDF for the current locale', async ({ page }) => {
  for (const [path, label, pdf] of [
    ['/', /Descargar CV/, '/Luciano_Perez_Ruiz_CV_ES.pdf'],
    ['/en/', /Download CV/, '/Luciano_Perez_Ruiz_CV_EN.pdf'],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole('link', { name: label }).first()).toHaveAttribute('href', pdf);
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#site-menu').getByRole('link', { name: label })).toHaveAttribute('href', pdf);
    const response = await page.request.get(pdf);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('pdf');
  }
});

test('unknown routes render the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
});
