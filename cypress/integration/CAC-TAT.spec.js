/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const testCases = [true, false];
    beforeEach(function () {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', "Central de Atendimento ao Cliente TAT");
    });

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('button[type="submit"]').click();
        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas.gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('Tentativa de digitar letras no campo telefone', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('#phone').type('abcdef').should('have.value', '');
        cy.get('button[type="submit"]').click();
        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('#phone-checkbox').check().should('be.checked');
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[name="firstName"]').type('Douglas').should('have.value', 'Douglas').clear().should('have.value', '');
        cy.get('input[name="lastName"]').type('Figueiredo').should('have.value', 'Figueiredo').clear().should('have.value', '');
        cy.get('#email').type('devdouglasfigueiredo@hotmail.com').should('have.value', 'devdouglasfigueiredo@hotmail.com').clear().should('have.value', '');
        cy.get('#open-text-area').type('obrigado pelo atendimento, huheaaheuaheugheaughea', { delay: 0 }).should('have.value', 'obrigado pelo atendimento, huheaaheuaheugheaughea').clear().should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]').should('have.length', 3).each(function ($radio) {
            cy.wrap($radio).check();
            cy.wrap($radio).should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked');
    });

    //data provider do phpunit
    Cypress._.each(testCases, (shouldDragDrop) => {
        it('seleciona um arquivo da pasta fixtures', function () {
            const fileUploadSelector = cy.get('#file-upload').should('have.not.value');
            if (shouldDragDrop) {
                fileUploadSelector.selectFile('cypress/fixtures/example.json', { action: "drag-drop" });
                fileUploadSelector.then(input => {
                    expect(input[0].files[0].name).to.equal('example.json');
                });
                return;
            }
            fileUploadSelector.selectFile('cypress/fixtures/example.json');
            fileUploadSelector.then(input => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
        });
    });

    it.only('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload').should('have.not.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function (input) {
            expect(input[0].files[0].name).to.equal('example.json');
        });
    });

    it.only('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload').should('have.not.value')
        .selectFile('cypress/fixtures/example.json', { action: "drag-drop" })
        .should(function (input) {
            expect(input[0].files[0].name).to.equal('example.json');
        });
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('a').should('have.attr', 'target', '_blank');
    });

    it('testa a página da política de privacidade de forma independente', function () {
        cy.get('#privacy a').should('have.attr', 'href', 'privacy.html');
    });

    it('testa a página da política de privacidade de forma independente', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click();
        cy.contains('CAC TAT - Política de privacidade').should('be.visible');
    });
});
