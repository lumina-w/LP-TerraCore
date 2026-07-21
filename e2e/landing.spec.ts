import { expect, test } from '@playwright/test';

test.describe('Landing page', () => {
  test('loads with the expected title and hero content', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/TerraCore/i);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('renders the primary navigation and CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Diagnóstico gratis' }).first()).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toBeVisible();
  });

  test('has no unhandled console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toEqual([]);
  });
});
