import { expect, test } from '@playwright/test';

test.describe('FAQ accordion', () => {
  test('expands a question on click and collapses the previously open one', async ({ page }) => {
    await page.goto('/');

    const firstQuestion = page.locator('[data-faq]').first().locator('.faq-q');
    const secondQuestion = page.locator('[data-faq]').nth(1).locator('.faq-q');

    await firstQuestion.scrollIntoViewIfNeeded();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');

    await firstQuestion.click();
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');

    const firstAnswerId = await firstQuestion.getAttribute('aria-controls');
    await expect(page.locator(`#${firstAnswerId}`)).toBeVisible();

    await secondQuestion.click();
    await expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
    await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  });
});
