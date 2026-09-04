import { test, expect } from '@playwright/test';

test('logo links to the home page for the current locale', async ({ page }) => {
  await page.goto('/privacy/');
  await page.getByRole('link', { name: 'Consulting IT' }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto('/en/privacy/');
  await page.getByRole('link', { name: 'Consulting IT' }).click();
  await expect(page).toHaveURL(/\/en\/$/);
});

test('language switcher toggles locale and exposes the correct hreflang', async ({ page }) => {
  await page.goto('/');
  const toEnglish = page.getByRole('link', { name: 'EN', exact: true });
  await expect(toEnglish).toHaveAttribute('hreflang', 'en');
  await toEnglish.click();
  await expect(page).toHaveURL(/\/en\/$/);

  const toSpanish = page.getByRole('link', { name: 'ES', exact: true });
  await expect(toSpanish).toHaveAttribute('hreflang', 'es');
  await toSpanish.click();
  await expect(page).toHaveURL(/\/$/);
});

test('language switcher on the privacy page links to the translated privacy page, not the home page', async ({ page }) => {
  await page.goto('/privacy/');
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/privacy\/$/);

  await page.getByRole('link', { name: 'ES', exact: true }).click();
  await expect(page).toHaveURL(/\/privacy\/$/);
});

test('desktop nav links point to the right sections and scroll to them', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop nav is hidden on mobile; see mobile-menu.spec.ts');

  await page.goto('/');
  const nav = page.locator('header nav').first();
  await expect(nav.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '/#services');
  await expect(nav.getByRole('link', { name: 'Sobre mí' })).toHaveAttribute('href', '/#about');
  await expect(nav.getByRole('link', { name: 'Experiencia' })).toHaveAttribute('href', '/#experience');
  await expect(nav.getByRole('link', { name: 'Reservar reunión' })).toHaveAttribute('href', '/booking/');
  await expect(nav.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '/#contact');

  await nav.getByRole('link', { name: 'Contacto' }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
});
