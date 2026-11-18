import { test, expect } from '@playwright/test';

for (const [path, lang, heading, pdf, md, home, otherLocale] of [
  ['/developer/', 'es', 'Del código al producto en producción.', '/Luciano_Perez_Ruiz_CV_Dev_ES.pdf', '/developer/cv.md', '/', '/en/developer/'],
  ['/en/developer/', 'en', 'From code to products in production.', '/Luciano_Perez_Ruiz_CV_Dev_EN.pdf', '/en/developer/cv.md', '/en/', '/developer/'],
] as const) {
  test(`developer CV (${lang}) renders its own copy, PDF and links`, async ({ page, request }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(/Full‑Stack/);
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    await expect(page.locator('#experience article')).toHaveCount(7);

    // Hero CV button downloads the developer PDF, and the PDF exists.
    await expect(page.getByRole('link', { name: /CV \(PDF\)/ }).first()).toHaveAttribute('href', pdf);
    expect((await request.get(pdf)).ok()).toBe(true);

    // Cross-link back to the PM profile, and the Markdown alternate for this page.
    await expect(page.getByTestId('cross-link')).toHaveAttribute('href', home);
    await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute('href', md);

    // Menu sections point to this page, and the language switch keeps the developer page.
    await page.locator('#menu-toggle').click();
    const menu = page.locator('#site-menu');
    await expect(menu.locator(`a[href="${path}#experience"]`)).toBeAttached();
    await expect(menu.locator(`a[hreflang][href="${otherLocale}"]`)).toBeAttached();
  });

  test(`${md} is the developer CV as Markdown`, async ({ request }) => {
    const body = await (await request.get(md)).text();
    expect(body).toMatch(/^# Luciano Perez Ruiz/);
    expect(body).toContain('NestJS');
    expect(body).toContain('Fury');
    expect(body).not.toContain('‑');
  });
}

test('the PM home links to the developer profile', async ({ page }) => {
  for (const [path, dev] of [
    ['/', '/developer/'],
    ['/en/', '/en/developer/'],
  ] as const) {
    await page.goto(path);
    await expect(page.getByTestId('cross-link')).toHaveAttribute('href', dev);
  }
});

test('llms.txt lists the developer CVs', async ({ request }) => {
  const body = await (await request.get('/llms.txt')).text();
  for (const p of ['/developer/cv.md', '/en/developer/cv.md', '/Luciano_Perez_Ruiz_CV_Dev_EN.pdf']) expect(body).toContain(p);
});
