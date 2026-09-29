import { test, expect } from '@playwright/test';

test('the home shows the latest posts as cards linking to the post in the same locale', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#blog .blog-card');
  await expect(cards).toHaveCount(2);
  await expect(cards.first()).toContainText('Medir tokens no es medir desempeño');
  await expect(cards.first()).toContainText('23 SEP 2026 · EQUIPOS · MÉTRICAS');
  await cards.first().click();
  await expect(page).toHaveURL(/\/blog\/medir-tokens-no-es-medir-desempeno\/$/);

  await page.goto('/en/');
  await expect(page.locator('#blog .blog-card').first()).toHaveAttribute(
    'href',
    '/en/blog/measuring-tokens-is-not-measuring-performance/'
  );
});

test('"see all articles" goes to the blog index for the current locale', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Ver todos los artículos/ }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();

  await page.goto('/en/');
  await page.getByRole('link', { name: /See all articles/ }).click();
  await expect(page).toHaveURL(/\/en\/blog\/$/);
});

test('language switcher on the blog index links to the translated blog index, not the home page', async ({ page }) => {
  await page.goto('/blog/');
  await page.locator('#menu-toggle').click();
  await page.locator('#site-menu a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en\/blog\/$/);

  await page.locator('#menu-toggle').click();
  await page.locator('#site-menu a[hreflang="es"]').click();
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

test('the metrics post is listed with its cover thumbnail and its CTA links to the contact form', async ({ page }) => {
  await page.goto('/blog/');
  const esLink = page.getByRole('link', { name: /Medir tokens no es medir desempeño/ });
  await expect(esLink.locator('img')).toBeVisible();
  await esLink.click();
  await expect(page).toHaveURL(/\/blog\/medir-tokens-no-es-medir-desempeno\/$/);
  await page.getByRole('link', { name: 'hablemos' }).click();
  await expect(page).toHaveURL(/\/#contact$/);

  await page.goto('/en/blog/');
  const enLink = page.getByRole('link', { name: /Measuring Tokens Is Not Measuring Performance/ });
  await expect(enLink.locator('img')).toBeVisible();
  await enLink.click();
  await expect(page).toHaveURL(/\/en\/blog\/measuring-tokens-is-not-measuring-performance\/$/);
  await page.getByRole('link', { name: 'let’s talk' }).click();
  await expect(page).toHaveURL(/\/en\/#contact$/);
});
