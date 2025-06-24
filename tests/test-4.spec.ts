import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByText('You will learn').click();
  await expect(page.getByText('You will learn')).toBeVisible();
  await page.getByRole('link', { name: 'Canary releases' }).click();
  await expect(page.getByText('note', { exact: true })).toBeVisible();
});