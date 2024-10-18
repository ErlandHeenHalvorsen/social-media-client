describe("template spec", () => {
	it("passes", () => {
		cy.visit("http://localhost:8080");
	});
});

describe("Login", () => {
	const email = "mock@stud.noroff.no";
	const password = "mockPassword";
	beforeEach(() => {
		cy.visit("http://localhost:8080");
	});
	it("should open the login modal and log you in", () => {
		//cy.get("#registerForm").should("be.visible");
		//cy.wait(2000);
		//cy.get(
		//	"#registerForm > div.modal-footer > button.btn.btn-outline-success",
		//).click();
		//cy.get("#loginForm").should("be.visible");
		//cy.wait(1000);
		cy.myLogin();

		cy.get("#loginEmail").type(email);
		cy.get("#loginPassword").type(password);
		cy.get("#loginForm > div.modal-footer > button.btn.btn-success").click({
			timeout: 10000,
		});
		cy.url().should("include", "/?view=profile&name=");
		cy.window().then((win) => {
			const token = win.localStorage.getItem("token");
			const profile = win.localStorage.getItem("profile");
			expect(token).to.exist;
			expect(profile).to.exist;
			cy.wait(5000);
		});
	});
	it("should show error if login-input is invalid", () => {
		cy.myLogin();
		cy.get("#loginEmail").type("invalid@stud.noroff.no");
		cy.get("#loginPassword").type("invalid");
		cy.wait(300);
		cy.on("window:alert", (alertText) => {
			expect(alertText).to.equal(
				"Either your username was not found or your password is incorrect",
			);
		});
		cy.get("form#loginForm").find('button[type="submit"]').click();
		cy.wait(5000);
	});
});
