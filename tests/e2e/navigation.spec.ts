import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/MKUltraman/);
    await expect(page.locator('.nav__logo')).toHaveText('MKUltraman');
  });

  test('nav links work', async ({ page }) => {
    await page.goto('/');
    const navLinks = [
      { text: 'Services', url: '/services' },
      { text: 'Writing', url: '/blog' },
      { text: 'About', url: '/about' },
      { text: 'Contact', url: '/contact' },
    ];

    for (const link of navLinks) {
      const el = page.locator(`.nav__links a:has-text("${link.text}")`);
      await expect(el).toHaveAttribute('href', link.url);
    }
  });

  test('all main pages return 200', async ({ page }) => {
    const pages = ['/', '/about', '/services', '/contact', '/blog', '/privacy', '/terms', '/tools'];
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    }
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hamburger menu toggles', async ({ page }) => {
    await page.goto('/');
    const burger = page.locator('#nav-burger');
    const mobileMenu = page.locator('#nav-mobile');

    await expect(burger).toBeVisible();
    await expect(mobileMenu).not.toBeVisible();

    await burger.click();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu).toBeVisible();

    await burger.click();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).not.toBeVisible();
  });
});
