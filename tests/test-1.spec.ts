import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.losc.fr/');
  await page.getByRole('button', { name: 'Accepter et Fermer' }).click();
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByText('ÉQUIPE FÉMININE', { exact: true }).click();
  await page.getByRole('link', { name: 'EFFECTIF' }).click();
  await page.goto('https://www.rclens.fr/fr');
  await page.getByRole('button', { name: 'J\'accepte' }).click();
  await page.getByRole('link', { name: 'FÉMININES' }).click();
  await page.getByRole('link', { name: 'Équipe première' }).click();
});