import { test, expect } from "@playwright/test";
import { TodosPom } from "../pom/todos.pom.ts";



test("Ajout 2 tâches", async ({ page }) => {
  const listTodos = new TodosPom(page);

  await page.goto("https://demo.playwright.dev/todomvc/#/")

  await listTodos.inscrire("Finir exercice")
  await listTodos.inscrire("Envoyer attestation")

  //await page.locator('.toggle').locator("nth=1").check();

  //await listTodos.cocherUneCase("Envoyer attestation");
  //const todotitle = page.getByTestId('todo-title').filter({ hasText: "Envoyer attestation"})
  
  //await this.page.getByText(name).locator('xpath=preceding-sibling::*[1]').check();
    //page.getByLabel(name).locator('..').locator('.toggle').check();
    listTodos.cocherUneCase("Envoyer attestation");
    await page.waitForTimeout(12000);
});

test("Nettoyage completed", async ({ page }) => {
    const listTodos = new TodosPom(page);

    await page.goto("https://demo.playwright.dev/todomvc/#/")

    await listTodos.inscrire("Finir exercice")
    await listTodos.inscrire("Envoyer attestation")

    await listTodos.cocherUneCase("Envoyer attestation");

    await listTodos.filtrer(listTodos.COMPLETED);
    //await page.getByRole('link', { name: 'Completed' }).click();
    expect(page.getByRole('listitem').filter({ hasText: "Envoyer attestation" }).getByLabel('Toggle Todo').isChecked());

    
    await listTodos.nettoyer();

    expect(page.getByLabel("Finir exercice").isVisible());
    expect(page.getByLabel("Envoyer attestation")).not.toBeVisible();
    
    //await page.getByRole('button', { name: 'Clear completed' }).click();
    
    await page.waitForTimeout(12000);
})
