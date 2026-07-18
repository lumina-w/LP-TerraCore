import { expect, test } from '@playwright/test';

test.describe('Pricing CTA -> demo form', () => {
  test('clicking a plan CTA preselects its operación size in the #demo form', async ({ page }) => {
    await page.goto('/');

    const profesionalCta = page
      .locator('.plan-cta', { hasText: 'Quiero el plan Profesional' })
      .first();
    await profesionalCta.scrollIntoViewIfNeeded();
    await profesionalCta.click();

    const radio = page.locator(
      'input[name="tamano_operacion"][value="Mediana (2 a 3 sedes, hasta 15 personas)"]',
    );
    await expect(radio).toBeChecked();
  });
});
