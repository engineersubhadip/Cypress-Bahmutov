import item from "../fixtures/bike-light.json";

describe("sorting", () => {
  beforeEach(() => {
    cy.log("**log in**");
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.location("pathname").should("equal", "/inventory.html");
  });

  it("has every item from the inventory", () => {});
});
