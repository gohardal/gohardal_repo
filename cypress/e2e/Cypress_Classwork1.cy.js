describe('get appropriate templates', () => {
    beforeEach(() => {
        cy.visit('/websites');
    });
    it('should search for templates', () => {
        const templates = 'wedding';
        cy.get('#searchBtn').click();
        cy.get('.rf-search__input').type(templates);
        cy.get('.rf-search__btn').click();
        cy.get('[class="rf-pack-card rf-cards-wrap"]')
        .find('p').contains('Invitation');
        // .then(
        //     items => {
        //         for (let i = 0; i < templates.length; i++) {
        //                        cy.get(items[i]).find('p');
        //                     }
            
        //     }
        // )
        // cy.get('#websitePresetsList')()
        //     .then((templates) => {
        //         for (let i = 0; i < templates.length; i++) {
        //             cy.get('item[i]').find('h1').should('contain', 'invitation');

        //         }
        //     });
    });
});