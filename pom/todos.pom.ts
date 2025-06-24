import { Locator, Page } from "@playwright/test";

export class TodosPom{
    readonly page: Page
    readonly todosField: Locator
    readonly todoLabelCheckbox: Locator
    readonly todoCheckbox: Locator

    readonly ALL = "All"
    readonly ACTIVE = "Active"
    readonly COMPLETED = "Completed"

    //readonly passwordField: Locator
    //readonly loginButton: Locator

    constructor(page:Page){
        this.page = page
        this.todosField = page.locator('.new-todo')
        this.todoLabelCheckbox = page.getByTestId('todo-title')
        this.todoCheckbox = page.locator('.toggle')
        //this.passwordField = page.getByTestId('password')
        //this.loginButton = page.getByTestId('login-button')
    }

    async inscrire(tache){
        await this.todosField.fill(tache);
        await this.todosField.press('Enter');

        //await this.passwordField.fill(password);
        //await this.loginButton.click();
    }

    
    async cocherUneCase(libelleTache : string){
        //await this.page.getByTestId('todo-title').getByText(libelleTache);
        //const tache =  await this.todoLabelCheckbox.getByText(libelleTache);
        //await this.todoLabelCheckbox.getByText(libelleTache);
        //this.todoLabelCheckbox.filter({ hasText: libelleTache});
        //tache.locator('..').check();
        //const parent = await this.todoCheckbox.filter({ has: tache });
        //parent.check()
        // await this.page.getByLabel(libelleTache)

        
        //await this.page.getByText(libelleTache).locator('..').locator('.toggle').check();
        
        await this.page.getByRole('listitem').filter({ hasText: libelleTache }).getByLabel('Toggle Todo').check();
 

    }

    async filtrer(statusTache : string){
        
        this.page.getByRole('link', { name: statusTache }).click();
    }

    async nettoyer(){
        await this.page.getByRole('button', { name: 'Clear completed' }).click();
    }
}