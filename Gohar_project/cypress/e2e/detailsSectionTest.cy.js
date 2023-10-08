import { detailSectionPage } from "../POM/EventSettingsDetailsPage/detailsSectionPage";

before(() => {
    //Catching the uncaught error 
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });
});

describe('test Event dashboard/Details section', () => {
    before(() => {
        cy.viewport(1680, 1050); // Set the viewport first

        // Precondition 1: a signed-in user
        cy.visit('/signin');
        cy.fixture('login').then(jsonOb => {
            cy.typeLoginCredentials(jsonOb.username, jsonOb.password);
        });
        cy.url().should('include', '/templates');

        // Precondition 2: open the appropriate project
        cy.visit('/website-maker/1061643/lang/edit/home');
    });

    beforeEach(() => {
        // Catching the uncaught error after applying the template,
        // to prevent tests from failing
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        cy.viewport(1680, 1050);
        // Open Event dashboard
        cy.get('body')
            .find('span')
            .filter(':contains("Event")')
            .should('be.visible')
            .click();

        cy.wait(2000);

        // Open Details section
        cy.get('body')
            .find('span')
            .filter(':contains("Details")')
            .should('be.visible')
            .click();
    });

    it('should check if title is required', () => {
        detailSectionPage.checkEmptyTitle();
    });

    it('should check if subtitle is not required', () => {
        // Step 1: Clear Subtitle field
        detailSectionPage.clearSubtitle();

        //Step 2: Save the changes
        detailSectionPage.elements.saveButton().should('be.enabled').click();
        cy.checkSavedMessage();
    });

    it('should set time zone', () => {
        // Step 1: check the checkbox and open dropdown
        detailSectionPage.setTimezone();

        // Step 2: Select the time zone
        cy.contains('Pacific').click({ force: true });
    });

    it('should check button text maximum character limit', () => {
        detailSectionPage.checkButtonMaximumChar()
    });


    afterEach(() => {
        // Close the dashboard
        detailSectionPage.elements.closeButton().click();

        // If Discard pop-up is shown, handle it
        cy.clickDiscardButton()
    });

});
