import { test, expect } from '@playwright/test';

const BOOKING_ENDPOINT = 'https://script.google.com/macros/s/TEST_DEPLOYMENT_ID/exec';

const fakeSlots = [
  { start: '2099-01-06T13:00:00.000Z', end: '2099-01-06T13:30:00.000Z' },
  { start: '2099-01-06T13:30:00.000Z', end: '2099-01-06T14:00:00.000Z' },
];

test('books a slot, shows the confirmation with the Meet link, and fires a GA4 event', async ({ page }) => {
  await page.route(BOOKING_ENDPOINT, async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ slots: fakeSlots }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        start: fakeSlots[0].start,
        meetLink: 'https://meet.google.com/abc-defg-hij',
      }),
    });
  });

  await page.goto('/booking/');
  await page.evaluate(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void; __gtagCalls: unknown[][] };
    const original = w.gtag;
    w.__gtagCalls = [];
    w.gtag = (...args: unknown[]) => {
      w.__gtagCalls.push(args);
      original?.(...args);
    };
  });

  await page.locator('.slots-list button').first().click();
  await page.getByLabel('Nombre').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByRole('button', { name: 'Confirmar reserva' }).click();

  await expect(page.locator('.confirmation')).toContainText('¡Listo!');
  await expect(page.locator('.confirmation a')).toHaveAttribute('href', 'https://meet.google.com/abc-defg-hij');

  const gtagCalls = await page.evaluate(() => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls);
  expect(gtagCalls).toContainEqual(['event', 'booking_confirmed']);
});

test('shows an error and reloads slots when the chosen slot was just taken', async ({ page }) => {
  let getCalls = 0;

  await page.route(BOOKING_ENDPOINT, async (route) => {
    if (route.request().method() === 'GET') {
      getCalls += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ slots: fakeSlots }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: false, error: 'slot_taken' }),
    });
  });

  await page.goto('/booking/');
  await page.locator('.slots-list button').first().click();
  await page.getByLabel('Nombre').fill('Test User');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByRole('button', { name: 'Confirmar reserva' }).click();

  await expect(page.locator('.form-status')).toContainText('Justo se ocupó ese horario');
  await expect.poll(() => getCalls).toBeGreaterThan(1);
});
