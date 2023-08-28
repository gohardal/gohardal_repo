describe('get appropriate templates', () => {
    beforeEach(() => {
        cy.visit('/signin');
    });

    it('login functionality', () => {
cy.typeLoginCredentials('gohar.dalyan@gmail.com', 'rendforest');

    })
});