import { test, expect } from '@playwright/test';
import { ListeProduits } from '../pom/ListeProduit.ts';
import { CheckoutPom } from '../pom/checkoutPage..ts';


test('Log in out', async ({ page }) => {

  const listprod = new ListeProduits(page);

  await page.goto('https://www.saucedemo.com');

  // Expect a title "to contain" a substring.
  
// change data-testid by default  in data-test

  //await page.getByRole('textbox', { name: 'user-name' }).fill('standard_user')

  //await page.locator('input#user-name').fill('standard_user')
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await expect (await listprod.burgerMenu).toBeVisible();
  await listprod.burgerMenu.click();
  //await expect(page.getByTestId('logout_sidebar_link')).toBeVisible();
  await page.getByTestId('logout-sidebar-link').click();


  /**
  await page.locator('id#react-burger-menu-btn').click();
  await page.getByTestId('login-logout_sidebar_link').click();
  */

  //await expect(page).toHaveTitle(/Playwright/);
});

test('Order', async ({ page }) => {

  const listprod = new ListeProduits(page);
  const checkout = new CheckoutPom(page);

  await page.goto('https://www.saucedemo.com');

  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await listprod.trier("hilo");
  //await page.getByRole('option', { : 'Sign in' }).click();

  /*  
  const first = page.getByTestId('inventory-list').locator(':scope >*').first();
  const firstButton = first.locator('button')
  const firstName = await first.locator('inventory_item_name').innerText();

  const second = page.getByTestId('inventory-list').locator(':scope >*').nth(1);
  const secondButton = second.locator('button')
  const secondName = await first.locator('inventory_item_name').innerText();
  */

  //await page.locator(".btn_small").locator('nth=0').click();
  //await page.locator(".btn_small").locator('nth=1').click();
  listprod.selectProductToCart('0');
  listprod.selectProductToCart('1');

  
  await page.getByTestId('shopping-cart-link').click();
  
  await page.getByTestId('checkout').click();

  //await page.getByTestId('firstName').fill('al');
  //await page.getByTestId('lastName').fill('fl');
  //await page.getByTestId('postalCode').fill('59000');
  await checkout.fill(checkout.firstNameField, 'al');
  await checkout.fill(checkout.lastNameField, 'fl');
  await checkout.fill(checkout.postalCode, '59000');

  await page.getByTestId('continue').click();
  
  await page.getByTestId('finish').click();

  //continue
  

  await page.waitForTimeout(10000); 
});
