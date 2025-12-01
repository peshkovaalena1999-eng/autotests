
describe('Тесты на login.qa.studio', () => {

    beforeEach(() => {
        cy.visit('https://login.qa.studio/');
    });

    it('Позитивный кейс авторизации', () => {
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.contains('Авторизация прошла успешно').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });

    it('Проверка логики восстановления пароля', () => {
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type('anyemail@test.ru');
        cy.get('#restoreEmailButton').click();

        cy.contains('Успешно отправили пароль на e-mail').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });

    it('Негативный кейс — неверный пароль', () => {
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('WRONG_PASSWORD');
        cy.get('#loginButton').click();

        cy.contains('Такого логина или пароля нет').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });

    it('Негативный кейс — неверный логин', () => {
        cy.get('#mail').type('wrong@dolnikov.ru');
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.contains('Такого логина или пароля нет').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });

    it('Негативный кейс — валидация без @', () => {
        cy.get('#mail').type('germandolnikov.ru'); // без @
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.contains('Нужно исправить проблему валидации').should('be.visible');
    });

    it('Проверка приведения логина к нижнему регистру (тест должен упасть — баг)', () => {
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.contains('Авторизация прошла успешно').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    });
});
