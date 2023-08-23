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
    cy.get(':nth-child(1) > .InputContent--1o9vo3j').clear().type(`${loginName}`);
    cy.get(':nth-child(2) > .InputContent--1o9vo3j').clear().type(`${loginPassword}`);
    cy.get('.ButtonWrapper--1wo79dv').click();
    cy.wait(5000);
});

// Cypress.commands.add('removeLastProject', { prevSubject: false }, () => {
//     cy.visit('/profile/my-websites');
//     cy.get(':nth-child(1) > .styled__ProjectExportContent-d92jo7-0 > .styled__DeleteBtnWrap-d92jo7-4 > .styled__DeleteBtn-d92jo7-5').click();
//     cy.get('body > div.styled__StyledPopupContainer-sc-1n4rcrz-0.WlKER > div > div > div.styled__DeleteBtns-sc-1anrxxb-1.jFvGqM > button.styled__StyledButton-sc-ihn4ts-0.clHGMo.styled__PopupBtn-sc-1anrxxb-2.NjXav').click();
//     cy.wait(5000)
// })

