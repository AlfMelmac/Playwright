import { Locator, Page } from "@playwright/test";

export class ListeProduits {
    readonly page: Page
    readonly burgerMenu: Locator
    readonly sortElement: Locator
    readonly addToCartButton: Locator


    constructor(page:Page){
        this.page = page
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.sortElement = page.getByTestId('product-sort-container');
        this.addToCartButton = page.locator(".btn_small")

    }
 
    
    
    async trier(id : string = "hilo"){
        /*await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        */
        await this.sortElement.selectOption(id);

    }

    async selectProductToCart(index : string) {
        await this.addToCartButton.locator('nth='+index).click();
    };


    
}