import { settingsLocators } from "./settingsPageLocators"

class SettingsPage {
    elements = {
        closeButton: () => { return cy.get(settingsLocators.closeButton) },
        saveButton: () => { return cy.get(settingsLocators.saveButton) },
        guestCountInput: () => { return cy.get(settingsLocators.guestCountInput) },
        closeButton: () => { return cy.get(settingsLocators.closeButton) },
        closePopupButton: () => { return cy.get(settingsLocators.closePopupButton) },
    };


    uploadImage() {
        //click on upload button
        cy.contains('Upload')
            .click();

        // Upload image 
        cy.get('input[type=file]').selectFile('cypress/fixtures/flower.jpeg', { force: true });

        //wait for upload
        cy.wait(15000);

        //get remove button to make sure image was uploaded
        cy.contains('Remove')
            .click();
    };

    receiveUpgradePopUp() {
        //find the radio button for enabling notifications
        cy.get('[role="radio"]').eq(0)
            .should('not.be.checked')
            .click();

        // Check if the pop-up with the specified title exists
        cy.contains('Upgrade to power your websites')

        //close the pop-up
        cy.get(settingsLocators.closePopupButton).eq(1).click()
    };

    changeGuestCount() {
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const rndInt = randomIntFromInterval(20, 40);
        //get guest count input
        this.elements.guestCountInput()
            .clear()
            .type(rndInt);

        if (rndInt > 30) {
            // If number is greater than 30, upgrade message is shown
            cy.wait(5000)
            cy.contains('Upgrade to power your websites');

            //close the pop-up
            cy.get(settingsLocators.closePopupButton).eq(1).click()

        }
        else {
            // If number is less than 30, click the save button
            this.elements.saveButton().click();

            //get success message
            cy.checkSavedMessage();

        }

    };

}

export const settingsSectionPage = new SettingsPage();

