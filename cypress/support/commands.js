// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFields', (firstName, lastName, email, textArea) => {
    cy.get('input[name="firstName"]').type(firstName).should('have.value', firstName);
    cy.get('input[name="lastName"]').type(lastName).should('have.value', lastName);
    cy.get('#email').type(email).should('have.value', email);
    cy.get('#open-text-area').type(textArea, { delay: 0 }).should('have.value', textArea);
  });