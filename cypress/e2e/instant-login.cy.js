/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import "cypress-map";

describe("sorting", () => {
  let userCookie;
  beforeEach(() => {
    if (userCookie) {
      cy.setCookie("session-username", userCookie.value, userCookie);
      cy.visit("/inventory.html");
    } else {
      cy.log("**log in**");
      cy.visit("/");
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
      cy.location("pathname").should("equal", "/inventory.html");
      cy.getCookie("session-username")
        .should("exist")
        .then((c) => {
          userCookie = c;
        });
    }
  });

  function sortByPriceOrName(order) {
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

  function getProductNames() {
    return cy
      .get("div.inventory_item_name")
      .should("have.length", 6)
      .map("innerText")
      .print();
  }

  it("by price lowest to highest", () => {
    sortByPriceOrName("Price (low to high)");
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
    sortByPriceOrName("Price (high to low)");
    // confirm the item prices are sorted from highest to lowest
    getProductPrices().should((currArr) => {
      const copyArr = [...currArr];
      copyArr.sort((a, b) => b - a);
      expect(copyArr).to.deep.equal(currArr);
    });
  });

  it("by name A to Z", () => {
    sortByPriceOrName("Name (A to Z)");
    getProductNames().should((currName) => {
      const sortedArr = Cypress._.sortBy(currName);
      expect(sortedArr, "Check A to Z sorting...").to.be.deep.equal(currName);
    });
  });

  it("by name Z to A", () => {
    sortByPriceOrName("Name (Z to A)");
    getProductNames().should((currName) => {
      const sortedArr = Cypress._.sortBy(currName).reverse();
      expect(sortedArr, "Check A to Z sorting...").to.be.deep.equal(currName);
    });
  });
});
