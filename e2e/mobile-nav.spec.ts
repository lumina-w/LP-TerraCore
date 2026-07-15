import { expect, test } from '@playwright/test';

test.describe('Mobile navigation drawer', () => {
  test('opens on hamburger click and closes on Escape', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('.nav-toggle');
    const drawer = page.locator('.mobile-drawer');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(drawer).toHaveAttribute('data-open', 'false');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(drawer).toHaveAttribute('data-open', 'true');
    await expect(drawer).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(drawer).toHaveAttribute('data-open', 'false');
  });

  test('closes when a drawer link is clicked', async ({ page }) => {
    await page.goto('/');

    await page.locator('.nav-toggle').click();
    await page.locator('.mobile-drawer a').first().click();

    await expect(page.locator('.mobile-drawer')).toHaveAttribute('data-open', 'false');
  });
});
