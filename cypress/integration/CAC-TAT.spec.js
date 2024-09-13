/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT");

    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');

        cy.contains('Enviar').click();
        cy.get('.success').should('be.visible');
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas.gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.contains('Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it('Tentativa de digitar letras no campo telefone', function () {

        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('#phone').type('abcdef').should('have.value', '')
        cy.contains('Enviar').click();
        cy.get('.success').should('be.visible');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('#phone-checkbox').click();
        cy.contains('Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[name="firstName"]').type('Douglas').should('have.value', 'Douglas').clear().should('have.value', '');
        cy.get('input[name="lastName"]').type('Figueiredo').should('have.value', 'Figueiredo').clear().should('have.value', '');
        cy.get('#email').type('devdouglasfigueiredo@hotmail.com').should('have.value', 'devdouglasfigueiredo@hotmail.com').clear().should('have.value', '')

        cy.get('#open-text-area').type('obrigado pelo atendimento, huheaaheuaheugheaughea', { delay: 0 }).should('have.value', 'obrigado pelo atendimento, huheaaheuaheugheaughea').clear()
            .should('have.value', '');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        cy.contains('Enviar').click();

        cy.get('.error').should('be.visible');
    })

    it.only('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
});