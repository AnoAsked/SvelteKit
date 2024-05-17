import { expect, test } from '@playwright/test';

test('index page has expected h2 welcome text', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to AnoAsked' })).toBeVisible();
});
