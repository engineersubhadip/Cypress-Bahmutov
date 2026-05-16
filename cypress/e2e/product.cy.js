import Login from "./pageObjects/login";
import "cypress-map";

const login = new Login();

describe("Product", () => {
  const user = Cypress.env("users").standard;
  // we can even check if the user object is valid
  if (!user) {
    throw new Error("Missing the standard user");
  }

  beforeEach(() => {
    cy.visit("/");
    login.enterUserName(user.username);
    login.enterPassword(user.password);
    login.clickOnLoginButton();
    cy.location("pathname").should("equal", "/inventory.html");
  });

  it("shows the item", () => {
    // the name and price of the item we are looking for
    const name = "Sauce Labs Fleece Jacket";
    const price = "$49.99";

    cy.contains(".inventory_item", name)
      .find(".inventory_item_label > a")
      .should((link) => {
        expect(link).to.have.attr("id");
      })
      .then((ele) => {
        const eleID = ele.attr("id").split("_")[1];
        cy.wrap(ele).click();
        cy.location("search").then((query) => {
          const param = new URLSearchParams(query);
          expect(eleID).to.include(param.get("id"));
        });
      });

    cy.get(".inventory_details .inventory_details_desc_container").within(
      () => {
        cy.get(".inventory_details_name").should("have.text", name);
        cy.get(".inventory_details_price").should("have.text", price);
      },
    );
    cy.get("#back-to-products").click();
    cy.location("pathname").should("equal", "/inventory.html");
  });
});
