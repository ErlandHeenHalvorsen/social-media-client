// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("myLogin", () => {
	cy.get("#registerForm").should("be.visible");
	cy.wait(2000);
	cy.get(
		"#registerForm > div.modal-footer > button.btn.btn-outline-success",
	).click();
	cy.get("#loginForm").should("be.visible");
	cy.wait(1000);
});

Cypress.Commands.add("validLogin", () => {
	const email = "mock@stud.noroff.no";
	const password = "mockPassword";

	cy.get("#loginEmail").type(email);
	cy.get("#loginPassword").type(password);
	cy.get("#loginForm > div.modal-footer > button.btn.btn-success").click({
		timeout: 10000,
	});
});
