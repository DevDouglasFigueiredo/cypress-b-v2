/// <reference types="cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {

    const testCases = [true, false];
    const THREE_SECONDS_IN_MSG = 3000;

    beforeEach(function () {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function () {
        cy.title()
            .should('be.equal', "Central de Atendimento ao Cliente TAT");
    });

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.clock()
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('button[type="submit"]')
            .click();
        cy.get('.success')
            .should('be.visible')
            .tick(THREE_SECONDS_IN_MSG)
        cy.get('.success')
            .should('not.be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas.gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('button[type="submit"]')
            .click();
        cy.get('.error')
            .should('be.visible');
    });

    it('Tentativa de digitar letras no campo telefone', function () {
        cy.clock()
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('#phone')
            .type('abcdef')
            .should('have.value', '');
        cy.get('button[type="submit"]')
            .click();
        cy.get('.success')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso')
            .tick(THREE_SECONDS_IN_MSG)
        cy.get('.success')
            .should('not.be.visible')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.clock();
        cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa');
        cy.get('#phone-checkbox')
            .check()
            .should('be.checked');
        cy.get('button[type="submit"]')
            .click();
        cy.get('.error')
            .should('be.visible')
            .tick(THREE_SECONDS_IN_MSG)
        cy.get('.error')
            .should('not.be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        const longText = Cypress._.repeat('haha', 25);
        cy.get('input[name="firstName"]')
            .type('Douglas')
            .should('have.value', 'Douglas')
            .clear()
            .should('have.value', '');
        cy.get('input[name="lastName"]')
            .type('Figueiredo')
            .should('have.value', 'Figueiredo')
            .clear()
            .should('have.value', '');
        cy.get('#email')
            .type('devdouglasfigueiredo@hotmail.com')
            .should('have.value', 'devdouglasfigueiredo@hotmail.com')
            .clear()
            .should('have.value', '');
        cy.get('#open-text-area')
            .invoke('val', longText, { delay: 0 })
            .should('have.value', longText)
            .clear()
            .should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        cy.clock()
        cy.get('button[type="submit"]')
            .click();
        cy.get('.error')
            .should('be.visible')
            .tick(THREE_SECONDS_IN_MSG)
        cy.get('.error')
            .should('not.be.visible')
    });

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio)
                    .check();
                cy.wrap($radio)
                    .should('be.checked');
            });
    });

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked');
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

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('have.not.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('have.not.value')
            .selectFile('cypress/fixtures/example.json', { action: "drag-drop" })
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('a')
            .should('have.attr', 'target', '_blank');
    });

    it('testa a página da política de privacidade de forma independente', function () {
        cy.get('#privacy a')
            .should('have.attr', 'href', 'privacy.html');
    });

    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();
        cy.contains('CAC TAT - Política de privacidade')
            .should('be.visible');
    });

    Cypress._.times(3, () => {
        it('exibe mensagem de sucesso, e remove acelerando 3 segundos', () => {

            cy.clock()
            cy.fillMandatoryFields('Douglas', 'Figueiredo', 'devdouglas@gmail.com.br', 'aaaaaaaaaaaaaaaaaaa'); // comando customizado que preenche o formulário e envia os dados
            cy.get('button[type="submit"]')
                .click();
            cy.contains('.success', 'Mensagem enviada com sucesso')
                .should('be.visible') // verificação de que a mensagem de sucessso está visível
                .tick(THREE_SECONDS_IN_MSG)
            cy.contains('.success', 'Mensagem enviada com sucesso')
                .should('not.be.visible')
        })
    })

    it('exibe mensagem de erro, e remove acelerando 3 segundos', () => {

        cy.clock()
        cy.get('button[type="submit"]')
            .click();
        cy.contains('.error', 'Valide os campos obrigatórios!')
            .should('be.visible')
            .tick(THREE_SECONDS_IN_MSG)
        cy.contains('.error', 'Valide os campos obrigatórios!')
            .should('not.be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('faz uma requisição HTTP', () =>{
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.include('CAC TAT');
        })
    })
});
