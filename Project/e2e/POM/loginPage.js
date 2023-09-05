export class LoginPage {
    typeUsername(username) {
        cy.get(':nth-child(1) > .InputContent--1o9vo3j').clear().type(username);
    }
}

export const loginPage = new LoginPage();
