describe('Check UI elements', () => {

    it("Check radio buttons", () => {
        cy.visit("https://testautomationpractice.blogspot.com/")
        //Check visibility
        cy.get('input#female').should('be.visible')
        cy.get('input#male').should('be.visible')
        //Select a radio button
        cy.get('input#male').check().should('be.checked')
        cy.get('input#female').should('not.be.checked')

    })

    it("Check checkboxes", () => {
        cy.visit("https://testautomationpractice.blogspot.com/")
        //Check visibility
        cy.get('input#sunday').should('be.visible')
        //Select checkbox
        cy.get('input#sunday').check().should('be.checked')
        //Unselect checkbox
        cy.get('input#sunday').uncheck().should('not.be.checked')
        //select all checkboxes
        cy.get('input.form-check-input[type="checkbox"]').check().should('be.checked')
        //Unselect all checkboxes
        cy.get('input.form-check-input[type="checkbox"]').uncheck().should('not.be.checked')
        //select first checkboxes
        cy.get('input.form-check-input[type="checkbox"]').first().check().should('be.checked')
        //select last checkboxes
        cy.get('input.form-check-input[type="checkbox"]').last().check().should('be.checked')
        //Unselect first checkboxes
        cy.get('input.form-check-input[type="checkbox"]').first().uncheck().should('not.be.checked')
        //Unselect last checkboxes
        cy.get('input.form-check-input[type="checkbox"]').last().uncheck().should('not.be.checked')

    })

})