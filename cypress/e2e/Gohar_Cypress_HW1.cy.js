//1. Verifying button title, using cy.get command
describe('verify button title', () => {
  beforeEach(() => {
    // Step 1: Navigate to the appropriate page
    cy.visit('https://www.renderforest.com/website-maker');
  })

  it('finds the button', () => {
    //Step 2: Find the button and check the text
    cy.get('body > main > section.hero > div > div.hero__content > a').should('have.text', 'Start Free Now');
  })
  //Actual result: Test succeeds, as the button title is right.
});

// 2. Test the login functionality of the application
const validUsername = 'gohar@gmail.com';
const validPassword = 'justtesting';

describe('login Functionality', () => {
  it('should log in successfully and redirect to the websites appropriate page', () => {
    // Step 1: Navigate to the login page
    cy.visit('www.renderforest.com/signin');

    // Step 2: Enter valid login credentials
    cy.get('#rf-auth-modal-root > div > div.AuthContent--1bhzjjn.hFpDYV > form > div:nth-child(1) > input').type(validUsername);
    cy.get('#rf-auth-modal-root > div > div.AuthContent--1bhzjjn.hFpDYV > form > div:nth-child(2) > input').type(validPassword);

    // Step 3: Click the "Login" button
    cy.get('#rf-auth-modal-root > div > div.AuthContent--1bhzjjn.hFpDYV > form > button').click();

    //Step 4: Verify if the user has logged/not always appliable as sometimes the system requires to click on captcha button
    cy.url().should('include', '/templates');
  })
  //Actual result: Step 4 fails, as the login credentials are not valid .
});

//3. Test the search functionality of the application
const keyword = 'birthday';

describe('search functionality', () => {
  before(() => {
    // Step 1: Navigate to the appropriate page
    cy.visit('https://www.renderforest.com/templates');
  })

  it('displays search results ', () => {
    //Step 2: Enter the keyword
    cy.get('#root > div > div > div > main > section > div.styled__SearchInputContainerWrapper-rtnn2j-0.jkONHb > div > div.styled__SearchInputViewMainContentWrapper-abusv6-1.klHyot > input').type(keyword);

    //Step 3: Verify the search results page 
    cy.url().should('include', '?search=birthday');
  })
  //Actual result: Test succeeds, as user navigates appropriate search page.
});

// 4. Form Validation
const subscriberMail = 'hello';

describe('form validation', () => {
  beforeEach(() => {
    cy.visit('');
  })


  it('should validate the input ', () => {
    //Step 2: Enter the submission email
    cy.get('#root > div.sc-5jhc6w-1.emfotd > section > div > div.sc-lsxzwv-0.liXfsO.sc-zyxusa-0.PXsbt > div > div > div.sc-lsxzwv-2.fhXiDd > form > div > input').type(subscriberMail);

    // Step 3: Click the "Subscribe" button
    cy.get('.wm-email-btn').click();

    // Step 4: Check the validation m
    cy.get('#root > div.sc-5jhc6w-1.emfotd > section > div > div.sc-lsxzwv-0.liXfsO.sc-zyxusa-0.PXsbt > div > div > div.sc-lsxzwv-2.fhXiDd > form > div > div');
  });

  it('should find the image element', () => {
    cy.get('.sc-lsxzwv-5').should('have.text', 'Subscribe to be the first to know when it arrives and stay up-to-date on all the latest news in the gaming world!')
  
  //Actual result: Test succeeds, as the email address is invalid. Otherwise it would fail, not getting the validation message
});
})
//5. Page Navigation
describe('test the navigation between pages', () => {
  beforeEach(() => {
    // Step 1: Navigate to the appropriate page
    cy.visit('https://www.renderforest.com/website-maker');
  });
  it('should navigate between pages', () => {
    //Step 1: Click on the 'Start free now' button
    cy.get('body > main > section.hero > div > div.hero__content > a').click();

    // Step 3: Click the "Subscribe" button
    cy.url().should('include', '/new/lang/start-creation');
  })
  //Actual result: Successfully navigates to 'https://www.renderforest.com/website-maker/new/lang/start-creation' page.
})
