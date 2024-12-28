const { describe } = require("mocha");

describe('My first test', () => {

    it('verify title positive test', () => {
        cy.visit("http://opensource-demo.orangehrmlive.com/")
        cy.title().should('eq', 'OrangeHRM')
    })

    it('verify title negative test', () => {
        cy.visit("http://opensource-demo.orangehrmlive.com/")
        cy.title().should('not.eq', 'OrangeHRMS')
    })

})
