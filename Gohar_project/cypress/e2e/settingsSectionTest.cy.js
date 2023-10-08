import { settingsSectionPage } from "../POM/EventSettingsSettingsPage/settingsSectionPage";

describe('test Event dashboard/Settings section', () => {

    before(() => {
        //Catching the uncaught error 
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    before(() => {
        cy.viewport(1680, 1050);
        // Precondition 1: open the appropriate project
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

        // Open Settings section
        cy.get('body')
            .find('span')
            .filter(':contains("Settings")')
            .eq(1)
            .should('be.visible')
            .click();
    });

    it('should upload an image', () => {
        settingsSectionPage.uploadImage()
    });


    it('should try to enable email notifications and receive upgrade pop-up', () => {
        settingsSectionPage.receiveUpgradePopUp();
    });


    it('should change maximum guest count', () => {
        settingsSectionPage.changeGuestCount()
    });

    afterEach(() => {
        // Close the dashboard
        settingsSectionPage.elements.closeButton().eq(0).click();

        // If Discard pop-up is shown, handle it
        cy.clickDiscardButton()
    });

    // After postcondition: sign out
    after(() => {
        cy.signOut();
    });

});