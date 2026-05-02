// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

it("Visit the store", () => {
  cy.visit("/");
  cy.get("#user-name").should("have.length.gte", 1).type("standard_user");
  cy.get("#password").should("have.length.gte", 1).type("secret_sauce");
  cy.get("#login-button").click();
  // * Capture only the path of the URL, to verify we are on the different page, same domain
  cy.location("pathname").should("equal", "/inventory.html");
  // * Unless the URL changes, we won't proceed
  cy.get(".inventory_list")
    .should("be.visible")
    .find(".inventory_item")
    .should("have.length.gt", 4);
});
