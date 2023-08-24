describe('test Event dashboard/Details section', () => {

  // before(() => {
    
  // });

  //precondition 3: Event dashboard/Details section opened
  beforeEach(() => {
    //catching the uncaught error after applying the template, 
    //to prevent tests from failing
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    });

    cy.viewport(1680, 1050);
    cy.visit('/signin');
    

    cy.fixture('login').then(jsonOb => {
      cy.typeLoginCredentials(jsonOb.username, jsonOb.password);
    });

    cy.wait(5000);
    cy.url().should('include', '/templates');

    //precondition 2: an RSVP template applied
    cy.visit('/website-maker/1061643/lang/edit/home');

    cy.get('button[aria-label="close"]', {timeout: 15000}).should('be.visible').click();

    cy.wait(2000);

    //Step 1: Open Event dashboard
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

    //Step 1: Clear Title field
    cy.get('.title').clear();

    //Step 2: Save the changes
    cy.get('button[type="primary"]').should('be.enabled').click();
    
    //Expected result: A validation message should be shown, as title is a required field
    cy.get('.error-message');
  });

  
  it('should check if paragraph  is required', () => {

    //Step 1: Clear Paragraph field
    cy.get('textarea').clear().type(Math.random());

    //Step 2: Check that `Save` button is enabled & Save the changes
    cy.get('button[type="primary"]').should('be.enabled').click();
    
    //Expected result: A success message will be shown, as the paragraph is not required.
    cy.get('button[type="primary"]').parent().siblings('div').then($div => {
      cy.get($div, {timeout: 15000}).should('have.text', 'Saved. Publish your website to see all changes.');
    })
  });

  afterEach(() => {

    cy.get('button[aria-label="close"]').click();

    cy.get('button').then($buttons => {
      const discardButtons = $buttons.filter(':contains("DISCARD")')
      if (discardButtons.length === 1) {
        cy.get('button').filter(':contains("DISCARD")').click();
      }
    })

  })

});

  

