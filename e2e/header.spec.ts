import { test, expect } from '@playwright/test';

test('name/monogram links to the home page for the current locale', async ({ page }) => {
  await page.goto('/privacy/');
  await page.locator('header').getByRole('link', { name: 'Luciano Perez Ruiz' }).click();
  await expect(page).toHaveURL(/\/#top$/);

  await page.goto('/en/privacy/');
  await page.locator('header').getByRole('link', { name: 'Luciano Perez Ruiz' }).click();
  await expect(page).toHaveURL(/\/en\/#top$/);
});

test('"Reservar" in the header jumps to the booking section', async ({ page }) => {
  await page.goto('/');
  const book = page.locator('header').getByRole('link', { name: 'Reservar' });
  await expect(book).toHaveAttribute('href', '/#booking');
  await book.click();
  await expect(page.locator('#booking')).toBeInViewport();
});

test('language toggle is visible in the header and marks the current locale', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('header #lang-switch');
  await expect(toggle).toBeVisible();
  await expect(toggle.locator('[aria-current="true"]')).toHaveText('ES');

  await page.goto('/en/');
  await expect(toggle).toBeVisible();
  await expect(toggle.locator('[aria-current="true"]')).toHaveText('EN');
});

test('header language toggle switches locale and exposes the correct hreflang', async ({ page }) => {
  await page.goto('/');
  const toEnglish = page.locator('#lang-switch a[hreflang="en"]');
  await expect(toEnglish).toHaveAttribute('href', '/en/');
  await toEnglish.click();
  await expect(page).toHaveURL(/\/en\/$/);

  const toSpanish = page.locator('#lang-switch a[hreflang="es"]');
  await expect(toSpanish).toHaveAttribute('href', '/');
  await toSpanish.click();
  await expect(page).toHaveURL(/\/$/);
});

test('header language toggle on the privacy page links to the translated privacy page, not the home page', async ({ page }) => {
  await page.goto('/privacy/');
  await page.locator('#lang-switch a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en\/privacy\/$/);

  await page.locator('#lang-switch a[hreflang="es"]').click();
  await expect(page).toHaveURL(/\/privacy\/$/);
});

test('language switcher in the menu still toggles locale', async ({ page }) => {
  await page.goto('/');
  await page.locator('#menu-toggle').click();
  await page.locator('#site-menu a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en\/$/);
});
