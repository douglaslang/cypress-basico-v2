/// <reference types="Cypress" />


//const { get } = require("cypress/types/lodash");

const delay = 0;

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
    })

    context('Sessão 03 -> Lesson 02', function(){
        it('preenche os campos obrigatórios e envia o formulário', function() {
            const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste';
            cy.get('#firstName').type('Douglas', { delay: delay });
            cy.get('#lastName').type('Lang', { delay: delay });
            cy.get('#email').type('douglas.lang@gmail.com', { delay: delay });
            cy.get('#open-text-area').type(longText, { delay: delay });
            
            //cy.get('button[type="submit"]').click();
            cy.contains('button', 'Enviar').click();

            cy.get('.success').should('be.visible');
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
            cy.get('#firstName').type('Douglas');
            cy.get('#lastName').type('Lang');
            cy.get('#email').type('douglas.lang@gmail,com');
            cy.get('#open-text-area').type('Teste');
            
            //cy.get('button[type="submit"]').click();
            cy.contains('button', 'Enviar').click();

            cy.get('.error').should('be.visible');
        
        })

        it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
            cy.get('#phone')
                .type('teste', { delay: delay })
                .should('have.value', '')
                .should('be.empty');
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
            cy.get('#firstName').type('Douglas', { delay: delay });
            cy.get('#lastName').type('Lang', { delay: delay });
            cy.get('#email').type('douglas.lang@gmail,com', { delay: delay });
            cy.get('#phone-checkbox').check();
            cy.get('#open-text-area').type('Teste');
            cy.get('.phone-label-span.required-mark').should('be.visible');
            
            //cy.get('button[type="submit"]').click();
            cy.contains('button', 'Enviar').click();
            
            cy.get('.error').should('be.visible');
            cy.get('.success').should('not.be.visible');
        })

        it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
            cy.get('#firstName')
                .type('Douglas')
                .should('have.value', 'Douglas')
                .clear()
                .should('be.empty');
            
                cy.get('#lastName')
                .type('Lang')
                .should('have.value', 'Lang')
                .clear()
                .should('be.empty');

            cy.get('#email')
                .type('douglas.lang@gmail,com')
                .should('have.value', 'douglas.lang@gmail,com')
                .clear()
                .should('be.empty');

            cy.get('#phone')
                .type('51993494410')
                .should('have.value', '51993494410')
                .clear()
                .should('be.empty');
        })

        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
            //cy.get('button[type="submit"]').click();
            cy.contains('button', 'Enviar').click();
            cy.get('.error').should('be.visible');        
        })

        it('envia o formuário com sucesso usando um comando customizado', function(){
            cy.fillMandatoryFieldsAndSubmit(); 

            cy.get('.success').should('be.visible');
        })
    })

    context('Sessão 04 -> Lesson 03', function(){
        it('seleciona um produto (YouTube) por seu texto', function(){
            cy.get('#product')
                .select('YouTube')
                .should('have.value', 'youtube');
        })
    
        it('seleciona um produto (Mentoria) por seu valor (value)', function(){
            cy.get('#product')
                .select('mentoria')
                .should('have.value', 'mentoria');
        })

        it('seleciona um produto (Blog) por seu índice', function(){
            cy.get('#product')
                .select(1)
                .should('have.value', 'blog');
        })
    })

    context('Sessão 05 -> Lesson 04', function(){
        it('marca o tipo de atendimento "Feedback"', function(){

            cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback');

            cy.get('input[type="radio"]')
                .check('feedback')
                .should('be.checked');
        })
    
        it('marca cada tipo de atendimento', function(){
            cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio)
                    .check()
                    .should('be.checked');
            })
        })
    })

    context('Sessão 06 -> Lesson 05', function(){
        it('marca ambos checkboxes, depois desmarca o último', () => {
            cy.get('input[type="checkbox"]')
                .as('checkboxes')
                .check()
                .should('be.checked');

            cy.get('@checkboxes')
                .last()
                .uncheck()
                .should('not.be.checked');
                
        })

        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
            cy.get('#phone-checkbox')
                .check()
                .should('have.value', 'phone');

            cy.contains('button', 'Enviar').click();
            cy.get('.error').should('be.visible');
        })
    })

    context('Sessão 07 -> Lesson 06', function(){
        it('seleciona um arquivo da pasta fixtures', () =>{
            //cy.get('input[type="file"]')
            cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('cypress/fixtures/example.json')
                .should(input => {
                    expect(input[0].files[0].name).to.equal('example.json')
                });
        })

        it('seleciona um arquivo simulando um drag-and-drop', () => {
            cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json')
                });
        })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
            cy.fixture('example.json', { encoding: null }).as('sampleFile')

            cy.get('#file-upload')
                .should('not.have.value')
                .selectFile('@sampleFile')
                .then(input => {
                    expect(input[0].files[0].name).to.equal('example.json')
                });
        })

    })

    context('Sessão 08 -> Lesson 07', function(){
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
            //cy.get('a[href="privacy.html"]')
            cy.get('#privacy a')
                .should('have.attr', 'target', '_blank');
        });

        it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
            //cy.get('a[href="privacy.html"]')
            cy.get('#privacy a')
                .invoke('removeAttr', 'target')
                .click();

            cy.contains('Talking About Testing').should('be.visible');
        });
    })
 });
