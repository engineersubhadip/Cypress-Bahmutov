class LoginPage {
  constructor() {
    this.userName = "#user-name";
    this.userPassword = "#password";
    this.loginButton = "#login-button";
    this.errorPopUpButton = "h3 > .error-button";
  }

  enterUserDetails(userName, userPassword) {
    cy.get(this.userName).type(userName);
    cy.get(this.userPassword).type(userPassword);
    cy.get(this.loginButton).click();
  }

  validateLockedOutMessage() {
    cy.contains('[data-test="error"]', "locked out").should("be.visible");
  }

  getUserName() {
    return cy.get(this.userName);
  }

  getUserPassword() {
    return cy.get(this.userPassword);
  }

  clickErrorPopUp() {
    cy.get(this.errorPopUpButton).click();
  }
}

export default LoginPage;
