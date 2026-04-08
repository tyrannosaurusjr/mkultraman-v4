import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('blog index loads with posts', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('.blog-headline')).toBeVisible();
    const posts = page.locator('.post-card');
    await expect(posts.first()).toBeVisible();
    expect(await posts.count()).toBeGreaterThan(0);
  });

  test('tag filtering works', async ({ page }) => {
    await page.goto('/blog');
    const allChip = page.locator('.tag-chip[data-tag="all"]');
    await expect(allChip).toHaveClass(/active/);

    const totalPosts = await page.locator('.post-card').count();

    // Click a specific tag
    const firstTag = page.locator('.tag-chip:not([data-tag="all"])').first();
    const tagName = await firstTag.getAttribute('data-tag');
    await firstTag.click();

    await expect(firstTag).toHaveClass(/active/);
    await expect(allChip).not.toHaveClass(/active/);

    // Filtered posts should be fewer or equal
    const visiblePosts = page.locator('.post-card:not([hidden])');
    const filteredCount = await visiblePosts.count();
    expect(filteredCount).toBeLessThanOrEqual(totalPosts);
    expect(filteredCount).toBeGreaterThan(0);

    // Each visible post should have the selected tag
    for (let i = 0; i < filteredCount; i++) {
      const tags = await visiblePosts.nth(i).getAttribute('data-tags');
      expect(tags?.split('|')).toContain(tagName);
    }

    // Click "All" resets
    await allChip.click();
    const resetCount = await page.locator('.post-card:not([hidden])').count();
    expect(resetCount).toBe(totalPosts);
  });

  test('blog post page loads', async ({ page }) => {
    await page.goto('/blog');
    const firstPost = page.locator('.post-card').first();
    const href = await firstPost.getAttribute('href');
    expect(href).toBeTruthy();

    await firstPost.click();
    await expect(page).toHaveURL(new RegExp(href!));
    await expect(page.locator('h1')).toBeVisible();
  });
});
