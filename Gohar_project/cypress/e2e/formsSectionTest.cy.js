import { formsSectionPage } from "../POM/EventSettingsFormsPage/formsSectionPage";

describe('test Event dashboard/Forms section', () => {

    before(() => {
        //Catching the uncaught error 
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    before(() => {
        cy.viewport(1680, 1050); // Set the viewport first

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

        // Open Forms section
        cy.get('body')
            .find('span')
            .filter(':contains("Forms")')
            .should('be.visible')
            .click();
    })

    it('should rename phone number field', () => {
        // check the checkbox if needed and rename Phone number field
        formsSectionPage.renamePhoneNumberField();
    });


    it('should add a new question', () => {
        // check the checkbox if needed and add a new question
        formsSectionPage.addQuestion();
    });


    it('should set guest count', () => {
        // check the checkbox if needed and open dropdown
        formsSectionPage.addAdditionalGuest();

        // Select guest count
        cy.contains('2').scrollIntoView().should('be.visible').click({ force: true });

    });

    afterEach(() => {
        // Close the dashboard
        formsSectionPage.elements.closeButton().click();

        // If Discard pop-up is shown, handle it
        cy.clickDiscardButton()
    });
})