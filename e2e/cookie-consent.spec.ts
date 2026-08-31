import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('cookie-notice-dismissed'));
  await page.reload();
});

test('cookie notice shows on first visit while analytics tracks by default', async ({ page }) => {
  await expect(page.locator('#cookie-consent')).toBeVisible();

  const dataLayer = await page.evaluate(() => (window as any).dataLayer as unknown[]);
  const hasConfigCall = dataLayer.some((entry: any) => entry?.[0] === 'config');
  expect(hasConfigCall).toBe(true);
});

test('dismissing the notice hides it and the choice persists on reload', async ({ page }) => {
  await page.getByRole('button', { name: 'Entendido' }).click();
  await expect(page.locator('#cookie-consent')).toBeHidden();

  await page.reload();
  await expect(page.locator('#cookie-consent')).toBeHidden();
});
