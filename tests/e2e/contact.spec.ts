import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test('contact form renders', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('form has correct Formspree action', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form');
    const action = await form.getAttribute('action');
    expect(action).toContain('formspree.io');
  });
});
