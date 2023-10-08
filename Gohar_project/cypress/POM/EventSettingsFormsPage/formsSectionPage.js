import { formsLocators } from "./formsPageLocators";

class FormsPage {
    elements = {
        saveButton: () => { return cy.get(formsLocators.saveButton) },
        addButton: () => { return cy.get(formsLocators.addButton) },
        closeButton: () => { return cy.get(formsLocators.closeButton) },
    };

    renamePhoneNumberField() {
        // Locate the checkbox for adding a phone number
        cy.contains('Add phone number').find('[role="checkbox"]').then(($checkbox) => {
            // Check if the checkbox is not checked, and click it if needed
            if (!$checkbox.is('[aria-checked="true"]')) {
                cy.wrap($checkbox).click();
            }            
        });
    }

    addQuestion() {
        const checkbox = cy.contains('Additional questions').find('[role="checkbox"]');

        //make sure that additional question option is checked
        checkbox.then(($element) => {
            if ($element.is("[aria-checked!='true']")) {
                // If it's not checked, click the checkbox
                cy.wrap($element).click();
            }

            // After clicking the checkbox, add an aditional question
            cy.contains('+ Add question')
                .click();
        });
    };

    addAdditionalGuest() {
        const checkbox = cy.contains('Additional guest option').find('[role="checkbox"]');

        //make sure that additional guest option is checked
        checkbox.then(($element) => {
            if ($element.is("[aria-checked!='true']")) {
                // If it's not checked, click the checkbox
                cy.wrap($element).click();
            }

            // After clicking the checkbox, wait for the dropdown to appear
            cy.contains('Additional guests').siblings('div').then(($div) => {
                cy.wrap($div, { timeout: 15000 }).click();
            });

        });
    };

};

export const formsSectionPage = new FormsPage();
