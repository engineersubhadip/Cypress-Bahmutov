import "cypress-map";

it.skip("sorts item by price : Brute Approach", () => {
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
  // you should transition to the inventory page
  // https://on.cypress.io/location
  // see assertion examples at
  // https://glebbahmutov.com/cypress-examples/commands/location.html
  cy.location("pathname").should("equal", "/inventory.html");
  // find the sort dropdown and select the low to high value
  cy.get('[data-test="product_sort_container"]').select("Price (low to high)");
  cy.get(".select_container > .active_option").should(
    "have.text",
    "Price (low to high)",
  );
  // https://on.cypress.io/select
  // Tip: inspect the HTML markup around the sort element
  //
  // find all price elements and map them to numbers
  cy.get(".pricebar > .inventory_item_price")
    .should("have.length", 6)
    .then((ele) => {
      // * ele is a jQuery collection containing DOM elements
      return Cypress.$.makeArray(ele).map((ele) =>
        Number(ele.innerText.slice(1)),
      );
    })
    .then(console.log);
  // following the "Lesson 02" solution
  // Tip: use cypress-map queries
  //
  // confirm the list of numbers is sorted
  // https://on.cypress.io/should
  // Tip: write a should(callback) function
  // that sorts the list and confirms the passed list
  // and the sorted are the same
});

it.skip("sorts item by price : Better Approach", () => {
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
  // you should transition to the inventory page
  // https://on.cypress.io/location
  // see assertion examples at
  // https://glebbahmutov.com/cypress-examples/commands/location.html
  cy.location("pathname").should("equal", "/inventory.html");
  // find the sort dropdown and select the low to high value
  cy.get('[data-test="product_sort_container"]').select("Price (low to high)");
  cy.get(".select_container > .active_option").should(
    "have.text",
    "Price (low to high)",
  );
  // https://on.cypress.io/select
  // Tip: inspect the HTML markup around the sort element
  //
  // find all price elements and map them to numbers
  cy.get(".pricebar > .inventory_item_price")
    .should("have.length", 6)
    .then((ele) => {
      // * ele is a jQuery collection containing DOM elements
      return Cypress._.map(ele, "innerText");
    })
    .then((ele) => {
      return ele.map((currEle) => Number(currEle.slice(1)));
    })
    .then(console.log);
  // following the "Lesson 02" solution
  // Tip: use cypress-map queries
  //
  // confirm the list of numbers is sorted
  // https://on.cypress.io/should
  // Tip: write a should(callback) function
  // that sorts the list and confirms the passed list
  // and the sorted are the same
});

it("sorts item by price : Optimized Approach", () => {
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
  // you should transition to the inventory page
  // https://on.cypress.io/location
  // see assertion examples at
  // https://glebbahmutov.com/cypress-examples/commands/location.html
  cy.location("pathname").should("equal", "/inventory.html");
  // find the sort dropdown and select the low to high value
  cy.get('[data-test="product_sort_container"]').select("Price (low to high)");
  cy.get(".select_container > .active_option").should(
    "have.text",
    "Price (low to high)",
  );
  // https://on.cypress.io/select
  // Tip: inspect the HTML markup around the sort element
  //
  // find all price elements and map them to numbers
  cy.get(".pricebar > .inventory_item_price")
    .should("have.length", 6)
    .map("innerText")
    .mapInvoke("slice", 1)
    .map(Number)
    .should((ele) => {
      /* : Approach 2
      const copyArr = [...ele];
      copyArr.sort((a, b) => a - b);
      */
      const sortedArr = Cypress._.sortBy(ele); // * Approach-1 [Best]
      expect(sortedArr).to.deep.equal(ele);
    });
  // .print();
  // following the "Lesson 02" solution
  // Tip: use cypress-map queries
  //
  // confirm the list of numbers is sorted
  // https://on.cypress.io/should
  // Tip: write a should(callback) function
  // that sorts the list and confirms the passed list
  // and the sorted are the same
});
