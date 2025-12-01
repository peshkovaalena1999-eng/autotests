
describe('E2E тест на покупку аватара в Битве Покемонов', () => {

    it('Покупка нового аватара', () => {
        cy.visit('https://pokemonbattle.me/login');

        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN');
        cy.get('#password').type('USER_PASSWORD');
        cy.get('.auth__button').click();

        cy.wait(2000);

        cy.get('.header__btns > [href="/shop"]').click();

        cy.get('.available')
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click();

        cy.contains('Купить').click();

        cy.contains('Покупка прошла успешно').should('be.visible');
    });

});
