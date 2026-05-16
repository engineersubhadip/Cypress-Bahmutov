import Login from "./pageObjects/login";

const login = new Login();

const standardUser = Cypress.env("users").standard;

describe("Logout", () => {
  it("User logs out", () => {
    cy.visit("/");
    login.enterUserName(standardUser.username);
    login.enterPassword(standardUser.password);
    login.clickOnLoginButton();
    cy.location("pathname").should("equal", "/inventory.html");
    cy.contains("button", "Open Menu").click();
    cy.wait(1000);
    cy.get(".bm-menu > nav")
      .should("be.visible")
      .contains("a", "Logout")
      .click();
    cy.location("pathname").should("equal", "/");
  });
});
