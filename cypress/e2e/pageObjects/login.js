class Login {
  constructor() {
    this.errorMessage = 'h3[data-test="error"]';
    this.userNameField = "#user-name";
    this.passwordField = "#password";
    this.loginButton = "#login-button";
  }
  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
  getUserNameField() {
    return cy.get(this.userNameField);
  }
  getPasswordField() {
    return cy.get(this.passwordField);
  }
  clickOnLoginButton() {
    cy.get(this.loginButton).click();
  }
  enterUserName(userName) {
    cy.get(this.userNameField, { log: false }).type(userName);
  }
  enterPassword(password) {
    cy.get(this.passwordField, { log: false }).type(password);
  }
}
export default Login;
