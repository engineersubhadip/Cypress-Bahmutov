import Login from "./pageObjects/login";

const login = new Login();

describe("Attempt to directly go to inventory page", () => {
  it("Scenario 1", () => {
    cy.visit("/inventory.html");
    cy.location("pathname").should("equal", "/");
    // * Error message is displayed
    login.getErrorMessage().should("be.visible");
    // * Error message contains the `target` page
    login.getErrorMessage().contains("inventory.html").should("be.visible");
    login
      .getUserNameField()
      .should("have.attr", "class")
      .and("include", "error");
    login
      .getPasswordField()
      .should("have.attr", "class")
      .and("include", "error");
  });
});
