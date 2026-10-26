import { test, expect } from '@playwright/test';

test('the home shows the latest posts as cards linking to the post in the same locale', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('#blog .blog-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.first()).toContainText('Reducir costos de infraestructura en la nube');
  await expect(cards.first()).toContainText('24 OCT 2026 · INFRAESTRUCTURA · CLOUD');
  const metricsCard = cards.filter({ hasText: 'Medir tokens no es medir desempeño' });
  await expect(metricsCard).toContainText('23 SEP 2026 · EQUIPOS · MÉTRICAS');
  await metricsCard.click();
  await expect(page).toHaveURL(/\/blog\/medir-tokens-no-es-medir-desempeno\/$/);

  await page.goto('/en/');
  await expect(page.locator('#blog .blog-card').first()).toHaveAttribute(
    'href',
    '/en/blog/how-to-cut-cloud-infrastructure-costs/'
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
  await page.locator('#lang-switch a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en\/blog\/$/);

  await page.locator('#lang-switch a[hreflang="es"]').click();
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

test('the cloud costs post republished from Pipa Code credits the original and points its canonical there', async ({ page }) => {
  for (const { path, original, note } of [
    {
      path: '/blog/reducir-costos-infraestructura-cloud/',
      original: 'https://pipacode.studio/blog/reducir-costos-infraestructura-cloud/',
      note: 'Publicado originalmente en Pipa Code.',
    },
    {
      path: '/en/blog/how-to-cut-cloud-infrastructure-costs/',
      original: 'https://pipacode.studio/en/blog/reducir-costos-infraestructura-cloud/',
      note: 'Originally published on Pipa Code.',
    },
  ]) {
    await page.goto(path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', original);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', original);
    await expect(page.getByTestId('republished-note')).toHaveText(note);
    await expect(page.getByTestId('republished-note').getByRole('link')).toHaveAttribute('href', original);
    await expect(page.getByTestId('republished-note').getByRole('link')).toHaveAttribute('target', '_blank');
    await expect(page.locator('article img')).toBeVisible();

    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
    const posting = jsonLd.map((s) => JSON.parse(s)).find((d) => d['@type'] === 'BlogPosting');
    expect(posting.author.name).toBe('Luciano Perez Ruiz');
    expect(posting.isBasedOn).toBe(original);
  }

  // Only this site's own canonical URLs go in the sitemap.
  const sitemap = await (await page.request.get('/sitemap-0.xml')).text();
  expect(sitemap).not.toContain('reducir-costos-infraestructura-cloud');
  expect(sitemap).not.toContain('how-to-cut-cloud-infrastructure-costs');
  expect(sitemap).toContain('/blog/medir-tokens-no-es-medir-desempeno/');
});

test('the canonical of a regular post is its own URL on this site', async ({ page }) => {
  await page.goto('/blog/medir-tokens-no-es-medir-desempeno/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://luciano-consulting.web.app/blog/medir-tokens-no-es-medir-desempeno/'
  );
  await expect(page.getByTestId('republished-note')).toHaveCount(0);
});

test('links to other sites inside a post open in a new tab, links within the site do not', async ({ page }) => {
  await page.goto('/blog/reducir-costos-infraestructura-cloud/');
  const external = page.locator('.prose a[href="https://estudiantino.com.ar"]');
  await expect(external).toHaveAttribute('target', '_blank');
  await expect(external).toHaveAttribute('rel', 'noopener noreferrer');

  await page.goto('/blog/el-sindrome-del-mvp-infinito-y-como-evitarlo/');
  await expect(page.getByRole('link', { name: 'hablemos' })).not.toHaveAttribute('target', /.+/);
});
