/// <reference types="Cypress" />

context.only('Sessão 08 -> Lesson 07', function(){
    
    Cypress._.times(5, () => {
        it('testa a página da política de privavidade de forma independente', () => {
            cy.visit('./src/privacy.html');
    
            cy.get('#title').should('be.visible');
            
            cy.contains('Talking About Testing').should('be.visible');
        });
    });
    
})