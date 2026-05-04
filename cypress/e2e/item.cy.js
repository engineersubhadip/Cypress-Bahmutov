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

  it("Load data from JSON, and verify the item exists : Bad Approach", () => {
    cy.fixture("bike-light.json").then((item) => {
      console.log(item);
      cy.contains(".inventory_item_description", item.name).within(() => {
        cy.get(".inventory_item_name").should("have.text", item.name);
        cy.get(".inventory_item_desc").should("have.text", item.description);
        cy.get(".inventory_item_price").should("have.text", item.price);
      });
    });
  });

  it("Load data from JSON, and verify the item exists : Best Approach", () => {
    cy.contains(".inventory_item_description", item.name).within(() => {
      cy.get(".inventory_item_name").should("have.text", item.name);
      cy.get(".inventory_item_desc").should("have.text", item.description);
      cy.get(".inventory_item_price").should("have.text", item.price);
    });
  });
});
