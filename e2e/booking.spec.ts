import { test, expect, type Page } from '@playwright/test';

const BOOKING_ENDPOINT = 'https://script.google.com/macros/s/TEST_DEPLOYMENT_ID/exec';

const fakeSlots = [
  { start: '2099-01-06T13:00:00.000Z', end: '2099-01-06T13:30:00.000Z' },
  { start: '2099-01-06T13:30:00.000Z', end: '2099-01-06T14:00:00.000Z' },
];

const twoDaySlots = [
  { start: '2099-01-06T13:00:00.000Z', end: '2099-01-06T13:30:00.000Z' },
  { start: '2099-01-07T13:00:00.000Z', end: '2099-01-07T13:30:00.000Z' },
];

const mockEndpoint = async (
  page: Page,
  slots: typeof fakeSlots,
  post: Record<string, unknown> | (() => Record<string, unknown>),
  onGet?: () => void
) => {
  await page.route(BOOKING_ENDPOINT, async (route) => {
    if (route.request().method() === 'GET') {
      onGet?.();
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ slots }) });
      return;
    }
    const body = typeof post === 'function' ? post() : post;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
  });
};

const fillDetails = async (page: Page) => {
  const widget = page.locator('.booking-widget');
  await widget.getByLabel('Nombre').fill('Test User');
  await widget.getByLabel('Email').fill('test@example.com');
};

test('books a slot from the home, shows the confirmation with the Meet link, and fires a GA4 event', async ({ page }) => {
  let postedBody: Record<string, unknown> = {};
  await page.route(BOOKING_ENDPOINT, async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ slots: fakeSlots }) });
      return;
    }
    postedBody = JSON.parse(route.request().postData() ?? '{}');
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, start: fakeSlots[0].start, meetLink: 'https://meet.google.com/abc-defg-hij' }),
    });
  });

  await page.goto('/');
  await page.evaluate(() => {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void; __gtagCalls: unknown[][] };
    const original = w.gtag;
    w.__gtagCalls = [];
    w.gtag = (...args: unknown[]) => {
      w.__gtagCalls.push(args);
      original?.(...args);
    };
  });

  const widget = page.locator('.booking-widget');
  const submit = widget.getByRole('button', { name: 'Confirmar reunión' });
  await expect(submit).toBeDisabled();

  await widget.locator('.time-option').first().click();
  await expect(widget.locator('.time-option').first()).toHaveAttribute('aria-pressed', 'true');
  await expect(widget.locator('.selection-label')).toContainText('10:00');
  await fillDetails(page);
  await submit.click();

  await expect(widget.locator('.confirmation')).toContainText('Reunión solicitada');
  await expect(widget.locator('.confirmation')).toContainText('Test User');
  await expect(widget.locator('.confirmation-meet')).toHaveAttribute('href', 'https://meet.google.com/abc-defg-hij');
  expect(postedBody).toMatchObject({ slotStart: fakeSlots[0].start, name: 'Test User', email: 'test@example.com', env: 'staging' });

  const gtagCalls = await page.evaluate(() => (window as unknown as { __gtagCalls: unknown[][] }).__gtagCalls);
  expect(gtagCalls).toContainEqual(['event', 'booking_confirmed']);

  await widget.getByRole('button', { name: 'Reservar otro horario' }).click();
  await expect(widget.locator('.booking-form')).toBeVisible();
  await expect(submit).toBeDisabled();
});

test('only days that have slots are shown, grouped in Argentina time', async ({ page }) => {
  await mockEndpoint(page, twoDaySlots, { success: true });
  await page.goto('/');
  const days = page.locator('.booking-widget .day-option');
  await expect(days).toHaveCount(2);
  await expect(days.first()).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.booking-widget .time-option')).toHaveCount(1);
});

test('shows an error and reloads slots when the chosen slot was just taken', async ({ page }) => {
  let getCalls = 0;
  await mockEndpoint(page, fakeSlots, { success: false, error: 'slot_taken' }, () => (getCalls += 1));

  await page.goto('/');
  const widget = page.locator('.booking-widget');
  await widget.locator('.time-option').first().click();
  await fillDetails(page);
  await widget.getByRole('button', { name: 'Confirmar reunión' }).click();

  await expect(widget.locator('.form-status')).toContainText('Justo se ocupó ese horario');
  await expect.poll(() => getCalls).toBeGreaterThan(1);
  await expect(widget.getByRole('button', { name: 'Confirmar reunión' })).toBeDisabled();
});

test('shows the rate-limit message inline', async ({ page }) => {
  await mockEndpoint(page, fakeSlots, { success: false, error: 'rate_limited' });
  await page.goto('/');
  const widget = page.locator('.booking-widget');
  await widget.locator('.time-option').first().click();
  await fillDetails(page);
  await widget.getByRole('button', { name: 'Confirmar reunión' }).click();
  await expect(widget.locator('.form-status')).toContainText('Ya tengo una reserva tuya');
});

test('switching days after picking a time clears the stale selection instead of leaving it submittable', async ({ page }) => {
  let postCalled = false;
  await mockEndpoint(page, twoDaySlots, () => {
    postCalled = true;
    return { success: true };
  });

  await page.goto('/');
  const widget = page.locator('.booking-widget');
  const submit = widget.getByRole('button', { name: 'Confirmar reunión' });
  await widget.locator('.time-option').first().click();
  await expect(submit).toBeEnabled();

  await widget.locator('.day-option').nth(1).click();

  await expect(submit).toBeDisabled();
  await expect(widget.locator('.time-option[aria-pressed="true"]')).toHaveCount(0);
  await expect(widget.locator('.selection-label')).toHaveText('Seleccioná día y horario');
  expect(postCalled).toBe(false);
});

test('shows the no-slots message when the calendar is full', async ({ page }) => {
  await mockEndpoint(page, [], { success: true });
  await page.goto('/');
  await expect(page.locator('.booking-widget .slots-status')).toContainText('No hay horarios disponibles');
});

test('the old /booking/ URLs redirect to the booking section of the home', async ({ page }) => {
  await page.goto('/booking/');
  await expect(page).toHaveURL(/\/#booking$/);

  await page.goto('/en/booking/');
  await expect(page).toHaveURL(/\/en\/#booking$/);
});
