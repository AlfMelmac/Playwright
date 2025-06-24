import { Locator, Page } from "@playwright/test";

export class CheckoutPom {
    readonly page: Page
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly postalCode: Locator

    constructor(page:Page){
        this.page = page
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.postalCode = page.getByTestId('postalCode')
    }


    async fill(element : Locator, fieldValue : string){
        element.fill(fieldValue);
    }

}