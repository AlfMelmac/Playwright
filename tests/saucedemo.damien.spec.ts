import { test, expect } from '@playwright/test';

test('login - logout', async ({ page }) => {
    //se rendre sur le site
    await page.goto('https://www.saucedemo.com/');
    //entrer l'utilisateur
    await page.locator('#user-name').fill("standard_user");
    //entrer le mot de passe
    await page.locator('#password').fill("secret_sauce");
    //cliquer sur le bouton login
    await page.locator('#login-button').click();
    //vérifer le nouvel url pour attester la connexion
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    //vérifier la présence du texte 'Products'
    await expect(page.getByTestId('title')).toHaveText('Products')
    //cliquer sur le menu
    await page.locator('#react-burger-menu-btn').click();
    //cliquer sur logout
    await page.locator('#logout_sidebar_link').click();
    //vérifier la présence sur champ username
    await expect(page.locator('#user-name')).toBeVisible();
});


test('login error message', async ({ page }) => {
    //se rendre sur le site
    await page.goto('https://www.saucedemo.com/');
    //entrer l'utilisateur
    await page.locator('#user-name').fill("locked_out_user");
    //entrer le mot de passe
    await page.locator('#password').fill("secret_sauce");
    //cliquer sur le bouton login
    await page.locator('#login-button').click();
    //vérifier la présence du message d'erreur
    await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    //vérifie qu'on est pas sur l'url qui atteste la bonne connexion
    await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
    //vérifie qu'un élément de la page suivante n'est pas présent
    await expect(page.getByTestId('title')).not.toBeVisible();
});


test('make an order', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //se connecter
    await page.locator('#user-name').fill("standard_user");
    await page.locator('#password').fill("secret_sauce");
    await page.locator('#login-button').click();


    //vérifer la bonne connexion
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');


    //trier High to Low
    await page.getByTestId('product-sort-container').selectOption('hilo');
    await expect(page.getByTestId('active-option')).toHaveText('Price (high to low)');


    //ajouter les 2 1er produits au panier
    await page.getByTestId('inventory-list').locator('button').locator('nth=0').click();
    const product_1 = await page.getByTestId('inventory-item-name').locator('nth=0').innerText();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');

    await page.getByTestId('inventory-list').locator('button').locator('nth=1').click();
    const product_2 = await page.getByTestId('inventory-item-name').locator('nth=1').innerText();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');


    //se rendre sur le panier
    await page.getByTestId('shopping-cart-link').click();
    await expect(page.getByTestId('title')).toHaveText('Your Cart');


    //vérifier que les produits au panier sont ceux attendus
    const product_1_cart = await page.getByTestId('inventory-item-name').locator('nth=0').innerText();
    const product_2_cart = await page.getByTestId('inventory-item-name').locator('nth=1').innerText();

    expect(product_1).toBe(product_1_cart);
    expect(product_2).toBe(product_2_cart);


    //se rendre sur le 'Checkout'
    await page.getByTestId('checkout').click();
    await expect(page.getByTestId('title')).toHaveText('Checkout: Your Information');


    //remplir les informations clients
    await page.getByTestId('firstName').fill('Damien');
    await expect(page.getByTestId('firstName')).not.toHaveValue('');

    await page.getByTestId('lastName').fill('Grenier');
    await expect(page.getByTestId('lastName')).not.toHaveValue('');

    await page.getByTestId('postalCode').fill('59370');
    await expect(page.getByTestId('postalCode')).not.toHaveValue('');


    //se rendre sur le récap
    await page.getByTestId('continue').click();
    await expect(page.getByTestId('title')).toHaveText('Checkout: Overview');
    //vérifier que les 2 produits sont toujours au panier
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('2');


    //Finalier la commande
    await page.getByTestId('finish').click();
    await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
});