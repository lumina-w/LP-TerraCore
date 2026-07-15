import { expect, test } from '@playwright/test';

test.describe('Legal pages', () => {
  for (const path of ['/terminos/', '/privacidad/', '/habeas-data/']) {
    test(`${path} renders with a 200 and a heading`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }
});

test.describe('404 page', () => {
  test('renders a not-found page for an unknown route', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toContainText(/404/);
  });
});
