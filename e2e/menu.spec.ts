import { test, expect } from '@playwright/test';

// The menu is always collapsed behind the "Menú" button, on every viewport.
test('menu opens as an overlay, lists every section, and closes after navigating', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('#menu-toggle');
  const menu = page.locator('#site-menu');

  await expect(toggle).toHaveText(/Menú/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeHidden();

  await toggle.click();
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveText(/Cerrar/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');

  const expected = [
    ['Inicio', '/#top'],
    ['Perfil', '/#profile'],
    ['Experiencia', '/#experience'],
    ['Habilidades', '/#skills'],
    ['Formación', '/#education'],
    ['Blog', '/#blog'],
    ['Reservar reunión', '/#booking'],
    ['Contacto', '/#contact'],
  ];
  for (const [label, href] of expected) {
    await expect(menu.getByRole('link', { name: label, exact: false }).first()).toHaveAttribute('href', href);
  }

  await menu.getByRole('link', { name: /Contacto/ }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(menu).toBeHidden();
  await expect(page.locator('#contact')).toBeInViewport();
});

test('menu closes with Escape and locks page scroll while open', async ({ page }) => {
  await page.goto('/');
  await page.locator('#menu-toggle').click();
  await expect(page.locator('#site-menu')).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

  await page.keyboard.press('Escape');
  await expect(page.locator('#site-menu')).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('menu in English uses English labels', async ({ page }) => {
  await page.goto('/en/');
  await page.getByRole('button', { name: /Menu/ }).click();
  await expect(page.locator('#site-menu').getByRole('link', { name: /Book a meeting/ })).toHaveAttribute('href', '/en/#booking');
});
