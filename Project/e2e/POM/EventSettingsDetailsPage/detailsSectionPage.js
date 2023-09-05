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

    clearSubtitle() {
        this.elements.subTitle().invoke('val').then((value) => {
            if (value == '') {
                this.elements.subTitle().type(Math.random());
            }
            this.elements.subTitle().clear();
            this.elements.paragraph().type(Math.random());
        })
    };

    checkSavedMessage() {
        this.elements.saveButton().parent().siblings('div').then($div => {
            cy.get($div, { timeout: 15000 }).should('have.text', 'Saved. Publish your website to see all changes.');
        });
    };

    setTimezone() {
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

    clickDiscardButton() {
        cy.get('button').then($buttons => {
            const discardButtons = $buttons.filter(':contains("DISCARD")');
            if (discardButtons.length === 1) {
                cy.get('button').filter(':contains("DISCARD")').click();
            }
        })
    };

    signOut() {
        cy.get('.styled__UserNameWrapper-sc-e5y73t-2').click({ force: true });
        cy.get('.styled__SignOutButton-sc-xdb1dq-0').click();
        cy.get('.styled__WarningButton-sc-xdb1dq-4').click();
    }
}

export const detailSectionPage = new DetailsPage();
