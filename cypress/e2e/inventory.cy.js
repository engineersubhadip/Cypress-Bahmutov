import inventory from "../fixtures/inventory";
import "cypress-map";

describe("sorting", () => {
  beforeEach(() => {
    cy.log("**log in**");
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.location("pathname").should("equal", "/inventory.html");
  });

  it("has every item from the inventory : Approach 1 : Less UI Calls", () => {
    cy.get("#inventory_container .inventory_item_description").should(
      "have.length",
      inventory.length,
    );
    cy.get(".inventory_item_label .inventory_item_name")
      .map("innerText")
      .should((uiItemName) => {
        const actualJsonItemName = inventory.map((ele) => ele.name);
        expect(actualJsonItemName).to.be.members(uiItemName);
      });
    cy.get(".inventory_item_label .inventory_item_desc")
      .map("innerText")
      .should((uiItemDescp) => {
        const actualJsonDescp = inventory.map((ele) => ele.desc);
        expect(actualJsonDescp).to.be.members(uiItemDescp);
      });
    cy.get(".inventory_item_description .inventory_item_price")
      .map("innerText")
      .mapInvoke("slice", 1)
      .map(Number)
      .should((uiItemPrice) => {
        const jsonItemPrice = inventory.map((ele) => ele.price);
        expect(jsonItemPrice).to.have.members(uiItemPrice);
      });
  });

  it("has every item from the inventory : Approach 2 : More UI Calls", () => {
    cy.get("#inventory_container .inventory_item_description").should(
      "have.length",
      inventory.length,
    );
    inventory.forEach((currEle) => {
      cy.contains(
        "#inventory_container .inventory_item_description",
        currEle.name,
      ).within(() => {
        cy.get(".inventory_item_name").should("have.text", currEle.name);
        cy.get(".inventory_item_desc").should("have.text", currEle.desc);
        cy.get(".inventory_item_price")
          .map("innerText")
          .mapInvoke("slice", 1)
          .map(Number)
          .its(0)
          .print()
          .should("be.equal", currEle.price);
      });
    });
  });
});
