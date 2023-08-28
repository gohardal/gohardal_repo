describe('test pages functionality', () => {

  // precondition 1: signed in user
  beforeEach(() => {
    const validUsername = 'gohar.dalyan@gmail.com';
    const validPassword = 'rendforest';
    cy.visit('/signin');
    cy.get('#rf-auth-modal-root > div > div.AuthContent--1bhzjjn.hFpDYV > form > div:nth-child(1) > input').type(validUsername);
    cy.get('#rf-auth-modal-root > div > div.AuthContent--1bhzjjn.hFpDYV > form > div:nth-child(2) > input').type(validPassword);
    cy.get('#rf-auth-modal-root > div > div.AuthContent--1bhzjjn.hFpDYV > form > button').click();
    cy.wait(5000);
    cy.url().should('include', '/templates');
  });

  //precondition 2: appropriate page visited
  beforeEach(() => {
    cy.visit('/websites');
  });

  //precondition 3: a template chosen
  beforeEach(() => {
    cy.get('[data-site-id="241"] > .rf-card > .rf-pack-card__pic-wrap > .rf-pack-card__pic').click();
  });

  //precondition 4: open template in the website-builder editor
  beforeEach(() => {
    cy.get('#root > div.rf-website-maker > div > div.styled__NavbarContainer-sc-y2u3a1-2.bVtPpn > div.styled__RightSection-sc-y2u3a1-8.iEAvoI > button').click();
  });


  it('should add a new page', () => {
    const pageName = 'hello';
    //Step 1: Open Pages dropdown 
    cy.get('#root > div.rf-website-maker > div > div > div.styled__HeaderWithLogo-sc-1c2rwvz-1.sZUDy > div > div.styled__LeftSection-sc-1c2rwvz-3.ickwVL > div.styled__DropdownContainer-sc-5jusj-0.kAWmcu > div').click();
    //Step 2: Click on Add new button
    cy.get('#pages-dropdown-container > div.styled__Footer-sc-x2j5s0-3.HKvhf > div').click();
    //Step 3: Type new page name
    cy.get('.page-name-input').type(pageName);
    //Step 4: Click on Add button 
    cy.get('body > div.page-name-editing-popup.styled__Popup-sc-10w4363-0.dqMYpy.styled__StyledPopupContainer-sc-1n4rcrz-0.cLrtod > div > div > div.styled__Content-sc-1a1kpx0-0.bvupzy > div.styled__ButtonsWrapper-sc-1a1kpx0-4.fwemvF > button.buttons__Button-sc-1eq4207-0.buttons__PrimaryButton-sc-1eq4207-2.jpgDVF').click();
  });

  it('should duplicate the home page', () => {
    //Step 1: Open Pages dropdown 
    cy.get('#root > div.rf-website-maker > div > div > div.styled__HeaderWithLogo-sc-1c2rwvz-1.sZUDy > div > div.styled__LeftSection-sc-1c2rwvz-3.ickwVL > div.styled__DropdownContainer-sc-5jusj-0.kAWmcu > div').click();
    //Step 2: Duplicate the Homepage
    cy.get(':nth-child(1) > .styled__OptionItem-sc-x2j5s0-14').click();
  });


  //afterEach postcondition 1: remove added pages
  afterEach(() => {
    cy.get('#pages-dropdown-container > div.styled__Content-sc-x2j5s0-2.TDjrt > ul > li.styled__PageItem-sc-x2j5s0-4.byIbLF > div > div:nth-child(3) > div > svg').click();
    cy.get('body > div.page-deleting-popup.styled__StyledPopupContainer-sc-1n4rcrz-0.cLrtod > div > div > div > div.styled__ButtonsWrapper-sc-15c4dz2-5.dInHbJ > button.styled__Button-sc-15c4dz2-2.styled__DeleteButton-sc-15c4dz2-4.hLFVyT').click();
  });
})

// afterEach postcondition 2: remove created projects
afterEach(() => {
  cy.visit('/profile/my-websites');
  cy.get(':nth-child(1) > .styled__ProjectExportContent-d92jo7-0 > .styled__DeleteBtnWrap-d92jo7-4 > .styled__DeleteBtn-d92jo7-5').click();
  cy.get('body > div.styled__StyledPopupContainer-sc-1n4rcrz-0.WlKER > div > div > div.styled__DeleteBtns-sc-1anrxxb-1.jFvGqM > button.styled__StyledButton-sc-ihn4ts-0.clHGMo.styled__PopupBtn-sc-1anrxxb-2.NjXav').click();
  cy.wait(5000)
});

// after postcondition: sign out
after(() => {
  cy.get('#hb').click();
  cy.get('#userAccountBtn').click();
  cy.get('.user-menu > :nth-child(5)').click();
});

