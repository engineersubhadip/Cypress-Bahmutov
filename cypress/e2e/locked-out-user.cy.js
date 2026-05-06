import LoginPage from "./pageObjects/loginPage";

const loginPage = new LoginPage();

describe("Suite 1", () => {
  it("Test script 1", () => {
    cy.visit("/");
    loginPage.enterUserDetails("locked_out_user", "secret_sauce");
    loginPage.validateLockedOutMessage();
    loginPage.getUserName().should("have.class", "error");
    loginPage.getUserPassword().should("have.class", "error");
    loginPage.clickErrorPopUp();
    loginPage.getUserName().should("not.have.class", "error");
    loginPage.getUserPassword().should("not.have.class", "error");
  });
});
