// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//login command
Cypress.Commands.add('typeLoginCredentials', { prevSubject: false }, (loginName, loginPassword) => {
    //type login
    cy.get('input[type=email]').each(($input, index) => {
        if (index === 0) {
            cy.wrap($input).clear().type(`${loginName}`);
        }
    });

    //type password
    cy.get('input[type=password]').each(($input, index) => {
        if (index === 0) {
            cy.wrap($input).clear().type(`${loginPassword}`);
        }
    });

    //click sign-in button
    cy.get('button[type=submit]').click();
    cy.wait(5000);
});

//Get success message about saving changes
Cypress.Commands.add('checkSavedMessage', { prevSubject: false }, () => {
    cy.get('button[type="primary"]').parent().siblings('div').then($div => {
        cy.wrap($div, { timeout: 15000 }).should('have.text', 'Saved. Publish your website to see all changes.');
    });
});

//Discard changes before closing the dashboard
Cypress.Commands.add('clickDiscardButton', { prevSubject: false }, () => {
    cy.get('button').then($buttons => {
        const discardButtons = $buttons.filter(':contains("DISCARD")');
        if (discardButtons.length === 1) {
            cy.get('button').filter(':contains("DISCARD")').click();
        }
    });
});


Cypress.Commands.add('signOut', () => {
    //open user dropdown
    cy.contains('Preview').parent().siblings('div').eq(3).children().eq(1).then($div => {
        cy.wrap($div, { timeout: 15000 }).click({ force: true });
    });
    //click sign out button
    cy.contains('Sign out').click();
    //close pop-up about saving changes
    cy.contains('OK, GOT IT').click();
});
