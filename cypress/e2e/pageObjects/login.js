class Login {
  constructor() {
    this.errorMessage = 'h3[data-test="error"]';
    this.userNameField = "#user-name";
    this.passwordField = "#password";
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
}
export default Login;
