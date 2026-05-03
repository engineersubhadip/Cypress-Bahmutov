// cypress/e2e/sort-by-price.cy.js
// @ts-check

// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import "cypress-map";

// https://www.chaijs.com/plugins/chai-sorted/

describe("sorting", () => {
  beforeEach(() => {
    cy.log("**log in**");
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.location("pathname").should("equal", "/inventory.html");
  });

  function sortByPrice(order) {
    cy.log("**sort by price low to high**");
    // sort the items from high to low price
    cy.get('[data-test="product_sort_container"]').select(order);
    cy.get(".select_container > .active_option").should("have.text", order);
  }

  function getProductPrices() {
    return cy
      .get(".pricebar > .inventory_item_price")
      .should("have.length", 6)
      .map("innerText")
      .mapInvoke("slice", "1")
      .map(Number);
  }
  it("by price lowest to highest", () => {
    sortByPrice("Price (low to high)");
    // sort the items from low to high
    getProductPrices().should((currArr) => {
      // * Approach 1 :-
      const copyArr = [...currArr];
      copyArr.sort((a, b) => a - b);
      expect(copyArr).to.deep.equal(currArr);
      // * Approach 2 :- [Make use of Cypress in-built Loadash]
      const sortedArr = Cypress._.sortBy(currArr);
      expect(sortedArr).to.deep.equal(currArr);
    });
    // confirm the item prices are sorted in ascending order
  });

  it("by price highest to lowest", () => {
    sortByPrice("Price (high to low)");
    // confirm the item prices are sorted from highest to lowest
    getProductPrices().should((currArr) => {
      const copyArr = [...currArr];
      copyArr.sort((a, b) => b - a);
      expect(copyArr).to.deep.equal(currArr);
    });
  });
});
