describe("sorting", () => {
  beforeEach(() => {
    cy.log("**log in**");
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.location("pathname").should("equal", "/inventory.html");
  });

  it("by price lowest to highest", () => {
    cy.contains(".inventory_item_description", "Sauce Labs Bike Light").within(
      () => {
        // * we are currently in the scope of ".inventory_item_label", which contains "Sauce Labs Bike Light"
        cy.get(".inventory_item_name").should(
          "have.text",
          "Sauce Labs Bike Light",
        );
        cy.get(".inventory_item_price").should("have.text", "$9.99");
      },
    );
  });
});
