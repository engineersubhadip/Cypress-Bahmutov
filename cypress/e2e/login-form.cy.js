import Login from "./pageObjects/login";

const login = new Login();

describe("Login form", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("shows an error message for empty username", () => {
    login.clickOnLoginButton();
    login
      .getErrorMessage()
      .should("be.visible")
      .and("include.text", "Epic sadface: Username is required");
  });
  it.only("shows an error message for empty password", () => {
    login.enterUserName("name");
    login.clickOnLoginButton();
    login
      .getErrorMessage()
      .should("be.visible")
      .and("include.text", "Epic sadface: Password is required");
  });
});
