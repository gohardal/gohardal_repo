import { detailsLocators } from "./detailsPageLocators";

class DetailsPage {
    elements = {
        title: () => { return cy.get(detailsLocators.title) },
        subTitle: () => { return cy.get(detailsLocators.subtitle) },
        paragraph: () => { return cy.get(detailsLocators.paragraph) },
        saveButton: () => { return cy.get(detailsLocators.saveButton) },
        errorMessage: () => { return cy.get(detailsLocators.errorMessage) },
        timeZoneDropdown: () => { return cy.get(detailsLocators.timeZoneDropdown) },
        rsvpButton: () => { return cy.get(detailsLocators.rsvpButton) },
        closeButton: () => { return cy.get(detailsLocators.closeButton) }
    };

    checkEmptyTitle() {
        // Step 1: Clear Title field, if necessary
        this.elements.title().clear();

        //Step 2: Save the changes
        this.elements.saveButton().should('be.enabled').click();

        //Expected result: A validation message should be shown, as title is a required field
        this.elements.errorMessage()
    };

    clearSubtitle() {

        //if subtitle field is empty, add value
        this.elements.subTitle().invoke('val').then((value) => {
            if (value == '') {
                this.elements.subTitle().type(Math.random());
            }
            //clear subtitle field
            this.elements.subTitle().clear();
            //clear paragraph field and add a new value, so that Save button becomes active, if subtitle field was initially empty
            this.elements.paragraph().clear().type(Math.random());
        })
    };

    setTimezone() {
        //make sure that timzone option is checked
        const checkbox = cy.contains('Show time zone').find('[role="checkbox"]');
        checkbox.then(($element) => {
            if ($element.is("[aria-checked!='true']")) {
                // If it's not checked, click the checkbox
                cy.wrap($element).click();
            }

            // After clicking the checkbox, wait for the dropdown to appear
            this.elements.timeZoneDropdown().click();
        });
    };

    checkButtonMaximumChar() {
        const buttonText = 'This is an RSVP button';

        // Get the RSVP button and clear its text
        this.elements.rsvpButton().clear().type(buttonText);;

        // Make sure the validation message is shown
        this.elements.errorMessage
    }

}

export const detailSectionPage = new DetailsPage();
