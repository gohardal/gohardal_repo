/// <reference types="cypress" />
describe('login', () => {
    beforeEach(() => {
        cy.visit('/signin');
    });

    it('login functionality', () => {
        cy.fixture('login').then(jsonOb => {
            cy.typeLoginCredentials(jsonOb.username, jsonOb.password);

        })

    })
});
