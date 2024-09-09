/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function (){
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal',"Central de Atendimento ao Cliente TAT");
  
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[name="firstName"]').type('Douglas').should('have.value', 'Douglas')
        cy.get('input[name="lastName"]').type('Figueiredo').should('have.value', 'Figueiredo')
        cy.get('#email').type('devdouglasfigueiredo@hotmail.com').should('have.value', 'devdouglasfigueiredo@hotmail.com')
        cy.get('#open-text-area').type('obrigado pelo atendimento').should('have.value', 'obrigado pelo atendimento')

        cy.get('button[type="submit"]').click();
        cy.get('.success').should('be.visible');
    })
  })
  