import { test, expect } from '@playwright/test';

test('blog nav link navigates to the blog index for the current locale', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop nav is hidden on mobile; see mobile-menu.spec.ts');

  await page.goto('/');
  await page.locator('header nav').first().getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();

  await page.goto('/en/');
  await page.locator('header nav').first().getByRole('link', { name: 'Blog' }).click();
  await expect(page).toHaveURL(/\/en\/blog\/$/);
});

test('language switcher on the blog index links to the translated blog index, not the home page', async ({ page }) => {
  await page.goto('/blog/');
  await page.getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/blog\/$/);

  await page.getByRole('link', { name: 'ES', exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
});

test('the closing CTA in a post links to the contact form for the current locale', async ({ page }) => {
  await page.goto('/blog/el-sindrome-del-mvp-infinito-y-como-evitarlo/');
  await page.getByRole('link', { name: 'hablemos' }).click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();

  await page.goto('/en/blog/the-infinite-mvp-syndrome-and-how-to-avoid-it/');
  await page.getByRole('link', { name: 'let’s talk' }).click();
  await expect(page).toHaveURL(/\/en\/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
});
