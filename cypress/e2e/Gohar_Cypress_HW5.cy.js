describe('test Event dashboard/Details section', () => {

  before(() => {
    //precondition 1: a signed in user
    cy.visit('/signin');
    cy.viewport(1680, 1050);
    cy.fixture('login').then(jsonOb => {
      cy.typeLoginCredentials(jsonOb.username, jsonOb.password);
    });
    cy.wait(5000);
    cy.url().should('include', '/templates');

    //precondition 2: open the appropriate project
    cy.visit('/website-maker/1061643/lang/edit/home');
  });

  //precondition 3: Event dashboard/Details section opened
  beforeEach(() => {
    //catching the uncaught error after applying the template, 
    //to prevent tests from failing
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
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

    //Step 1: Clear Title field, if necessary
    cy.get('.title').invoke('val').then((value) => {
        cy.get('.title').clear();
    });

    //Step 2: Save the changes
    cy.get('button[type="primary"]').should('be.enabled').click();

    //Expected result: A validation message should be shown, as title is a required field
    cy.get('.error-message');
  });

  it('should check if subtitle  is not required', () => {

    //Step 1: Clear Subtitle field
    cy.get('.subTitle').invoke('val').then((value) => {
      if (value == '') {
        cy.get('.subTitle').type(Math.random());
      } 
      cy.get('.subTitle').clear();
      cy.get('.paragraph').type(Math.random());
    });

    //Step 2: Check that `Save` button is enabled & Save the changes
    cy.get('button[type="primary"]').should('be.enabled').click();

    //Expected result: A success message will be shown, as the subtitle is not required.
    cy.get('button[type="primary"]').parent().siblings('div').then($div => {
      cy.get($div, { timeout: 15000 }).should('have.text', 'Saved. Publish your website to see all changes.');
    });
  });


  it('should set time zone', () => {
    const checkbox = cy.contains('Show time zone').find('[role="checkbox"]');

    checkbox.then(($element) => {
      if ($element.is("[aria-checked!='true']")) {
        // If it's not checked, click the checkbox
        cy.wrap($element).click();
      }
      // After clicking the checkbox, wait for the dropdown to appear
      cy.get('.dropdown-wrapper').click();

      // Select the time zone
      cy.contains('America/Adak').click({ force: true });
      cy.get('.paragraph').type(Math.random());

      // Click the save button 
      cy.get('.save-btn').click();

    });
  });

  it('should check button text maximum character limit', () => {
    const buttonText = 'This is an RSVP button';
    //Get the RSVP button, clear it, type a title
    cy.get('.rsvp-button').clear().type(buttonText);
    //Make sure the validation message is shown
    cy.get('body > div.event-popup.styled__EventPopup-sc-1ftbbf5-0.kixzzv.styled__StyledPopupContainer-sc-1n4rcrz-0.cLrtod > div > div > div > div.styled__ContentWrapper-sc-1ftbbf5-5.dnlgYH > div.styled__TabContainer-sc-1ru5i27-0.gBMYMF > div.styled__Content-sc-1ru5i27-1.kpnWMK > div.styled__MainSection-sc-1ru5i27-2.SrVMp > div.styled__LeftSection-sc-1ru5i27-3.gpQjIJ > div.input-container.styled__InputContainer-sc-1sc07vg-0.jNQePx > div.error-message.styled__ErrorMessage-sc-1sc07vg-6.fJJYZv');

  });

  afterEach(() => {
    //close the dashboard
    cy.get('button[aria-label="close"]').click();

    //if Discard pop-up is shown, handle it
    cy.get('button').then($buttons => {
      const discardButtons = $buttons.filter(':contains("DISCARD")')
      if (discardButtons.length === 1) {
        cy.get('button').filter(':contains("DISCARD")').click();
      }
    })
  })

  // after postcondition: sign out
  after(() => {
    cy.get('.styled__UserNameWrapper-sc-e5y73t-2').click({force: true});
    cy.get('.styled__SignOutButton-sc-xdb1dq-0').click();
    cy.get('.styled__WarningButton-sc-xdb1dq-4').click();
  });

});
