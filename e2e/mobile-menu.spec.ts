import { test, expect } from '@playwright/test';

test('mobile menu opens, shows nav links, and closes after navigating', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only interaction');

  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  const menu = page.locator('#mobile-menu');

  await expect(toggle).toBeVisible();
  await expect(menu).toBeHidden();

  await toggle.click();
  await expect(menu).toBeVisible();

  await page.getByRole('link', { name: 'Servicios' }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(menu).toBeHidden();
});

test('hamburger toggle is hidden on desktop, full nav is shown instead', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop-only assertion');

  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
  await expect(page.locator('header nav').first()).toBeVisible();
});
