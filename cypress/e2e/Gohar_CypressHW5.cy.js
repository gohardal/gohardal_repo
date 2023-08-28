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
  
      //precondition 2: an RSVP template applied
      cy.visit('/website-maker/1061643/lang/edit/home');
      // cy.get('.styled__Button-sc-1da81z7-5').click();
    });
  
    //precondition 3: Event dashboard/Details section opened
    beforeEach(() => {
      //catching the uncaught error after applying the template, 
      //to prevent tests from failing
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      });
      //Step 1: Open Event dashboard/Details section
      cy.viewport(1680, 1050);
      cy.get('.styled__MainSidebarContainer-sc-1aauc4w-0 > :nth-child(3) > :nth-child(1)').click();
      cy.wait(5000);
      cy.get('ul > :nth-child(1)').click();
    });
  
  
    it('should check if title is required', () => {
  
      //Step 1: Clear Title field
      cy.get('.title').clear();
  
      //Step 2: Save the changes
      cy.get('body > div.event-popup.styled__EventPopup-sc-1ftbbf5-0.kixzzv.styled__StyledPopupContainer-sc-1n4rcrz-0.cLrtod > div > div > div > div.styled__ContentWrapper-sc-1ftbbf5-5.dnlgYH > div.styled__TabContainer-sc-1ru5i27-0.gBMYMF > div.styled__Footer-sc-1xj4hwx-0.eyzPEm > div.styled__Buttons-sc-1xj4hwx-2.hdvHUm > button.save-btn.styled__Button-sc-1bl7mu5-0.ikdCMr').click();
      cy.get('.error-message');
      //Expected result: A validation message should be shown, as title is a required field
    });
  
    it('should check if paragraph  is required', () => {
  
      //Step 1: Clear Paragraph field
      cy.get('.subTitle').clear();
  
      //Step 2: Save the changes
      cy.get('body > div.event-popup.styled__EventPopup-sc-1ftbbf5-0.kixzzv.styled__StyledPopupContainer-sc-1n4rcrz-0.cLrtod > div > div > div > div.styled__ContentWrapper-sc-1ftbbf5-5.dnlgYH > div.styled__TabContainer-sc-1ru5i27-0.gBMYMF > div.styled__Footer-sc-1xj4hwx-0.eyzPEm > div.styled__Buttons-sc-1xj4hwx-2.hdvHUm > button.save-btn.styled__Button-sc-1bl7mu5-0.ikdCMr').click();
      cy.get('<div class="styled__SavingInfo-sc-1xj4hwx-1 dpKSAU"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><defs><linearGradient id="Done_svg__c" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#7bf596"></stop><stop offset="1" stop-color="#4fdc6f"></stop></linearGradient><clipPath id="Done_svg__a"><path data-name="Rectangle 16861" transform="translate(1289 2811)" fill="#fff" stroke="#707070" d="M0 0h30v30H0z"></path></clipPath><filter id="Done_svg__b" x="0" y="1" width="30" height="30" filterUnits="userSpaceOnUse"><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation="1" result="blur"></feGaussianBlur><feFlood flood-color="#5ce37b" flood-opacity="0.8"></feFlood><feComposite operator="in" in2="blur"></feComposite><feComposite in="SourceGraphic"></feComposite></filter></defs><g data-name="Mask Group 368" transform="translate(-1289 -2811)" clip-path="url(#Done_svg__a)"><g data-name="Check with background"><g transform="translate(1289 2811)" filter="url(#Done_svg__b)"><rect data-name="Rectangle Copy" width="24" height="24" rx="12" transform="translate(3 3)" fill="url(#Done_svg__c)"></rect></g><path d="M1301.195 2828.884l-2.952-2.927a.607.607 0 010-.856l.9-.893a.607.607 0 01.862 0l2.691 2.679 5.587-5.133a.607.607 0 01.844 0l.9.917a.607.607 0 010 .85l-6.985 6.42a.607.607 0 01-.844 0l-.9-.917a.528.528 0 01-.1-.14z" fill="#fff" fill-rule="evenodd"></path></g></g></svg></div>');
      //Expected result: A success message will be shown, as the paragraph is not required.
    });
  
    afterEach(() => {
      //if 'Discard changes' pop up is shown, click on discard button, else - close the dashboard
      cy.get('.styled__StyledCloseIcon-sc-1n4rcrz-2 > .styled__StyledContainer-ci1yl8-0').click().then(($btn) => {
        cy.get('body > div.styled__ConfirmPopup-sc-o225h-0.dGnJUI.styled__StyledPopupContainer-sc-1n4rcrz-0.cLrtod')
          .should('exist')  // Check if the popup exists
          .then(($popup) => {
            if ($popup.length > 0) {
              // Popup is shown, click the confirm button
              cy.get('.styled__ConfirmButton-sc-o225h-7').click();
            } else {
              cy.get('.title')
            }
          });
      });
    })
  });
  
    
  
  