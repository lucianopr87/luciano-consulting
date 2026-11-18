import { test, expect } from '@playwright/test';

test('llms.txt points to the Markdown and PDF CVs', async ({ request }) => {
  const response = await request.get('/llms.txt');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('text/plain');
  const body = await response.text();
  expect(body).toMatch(/^# Luciano Perez Ruiz/);
  for (const path of ['/cv.md', '/en/cv.md', '/Luciano_Perez_Ruiz_CV_EN.pdf', '/Luciano_Perez_Ruiz_CV_ES.pdf']) {
    expect(body).toContain(path);
  }
});

for (const [path, heading, company] of [
  ['/cv.md', '## Experiencia', 'Tino · proyecto propio'],
  ['/en/cv.md', '## Experience', 'Tino · own product'],
] as const) {
  test(`${path} is the CV as Markdown, generated from the site copy`, async ({ request }) => {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    const body = await response.text();
    expect(body).toMatch(/^# Luciano Perez Ruiz/);
    expect(body).toContain(heading);
    expect(body).toContain(company);
    expect(body).toContain('Mercado Libre');
    expect(body).not.toContain('‑');
  });
}

test('pages link their Markdown CV and publish the Person JSON-LD', async ({ page }) => {
  for (const [path, md] of [
    ['/', '/cv.md'],
    ['/en/', '/en/cv.md'],
  ] as const) {
    await page.goto(path);
    await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute('href', md);
    const graphs = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((nodes) => nodes.map((n) => JSON.parse(n.textContent ?? '{}')));
    const person = graphs.flatMap((g) => g['@graph'] ?? []).find((n) => n['@type'] === 'Person');
    expect(person.jobTitle).toContain('Product Owner');
    expect(person.worksFor.name).toBe('Pipa Code Studio');
  }
});
