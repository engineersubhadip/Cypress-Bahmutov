import "cypress-map";

it.skip("confirms the item with the lowest price : Non-Optimized", () => {
  cy.visit("/");
  // Tip: grab the username and the password from the login page
  // It is ok for now to hardcode it in the spec source here
  //
  // get the username field and type the standard user
  // https://on.cypress.io/get
  // https://on.cypress.io/type
  cy.get('[data-test="username"]').type("standard_user");
  // get the password field and type the password
  cy.get('[data-test="password"]').type("secret_sauce");
  // get the login button and click on it
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click();
  cy.location("pathname").should("equal", "/inventory.html");
  // once the inventory loads, grab the item prices
  cy.get(".pricebar >  .inventory_item_price")
    .should("be.visible")
    .and("have.length.gte", 6)
    .then((ele) => {
      // * ele is a jQuery [] containing DOM elements
      return Cypress._.map(ele, "innerText");
    })
    .then((rawText) => {
      // * rawText -> is a plain JS[] containing strings
      return rawText.map((ele) => Number(ele.slice(1)));
    })
    .then((priceArr) => {
      return Cypress._.min(priceArr);
    })
    .then(console.log)
    .should("equal", 7.99);
});

it("Confirms the items with the lowest price : Optimized", () => {
  cy.visit("/");
  cy.get('[data-test="username"]').type("standard_user");
  // get the password field and type the password
  cy.get('[data-test="password"]').type("secret_sauce");
  // get the login button and click on it
  // https://on.cypress.io/click
  cy.get('[data-test="login-button"]').click();
  // * Verify we have landed on the new url
  cy.location("pathname").should("equal", "/inventory.html");
  cy.get(".pricebar  > .inventory_item_price")
    .should("have.length", 6)
    .map("innerText")
    .mapInvoke("slice", 1)
    .map(Number)
    .apply(Cypress._.min)
    .should("equal", 7.99);
});
