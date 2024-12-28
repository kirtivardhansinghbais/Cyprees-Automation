describe('Handle dropdown', () => {

    it("Select dropdown", () => {
        cy.visit("https://www.zoho.com/commerce/free-demo.html")
        //Check visibility
        cy.get('select#zcf_address_country').should('be.visible')
        //Select a a option
        cy.get('select#zcf_address_country').select('Italy')
            .should('have.value', 'Italy')

    })

    it("Select dropdown with out select tag", () => {
        cy.visit("https://dummyticket.com/dummy-ticket-for-visa-application/")
        //Check visibility and select
        cy.get('#select2-billing_country-container').should('be.visible').click()
        //Select the text field and enter
        let country = "India"
        cy.get('input[role="combobox"]').should('be.visible').type(country).type('{enter}')
        //Check if the correct vale is reflecting
        cy.get('#select2-billing_country-container').should('have.text', country)

    })

    it("Auto suggest dropdown", () => {
        cy.visit("https://www.wikipedia.org/")
        //Check visibility and search box
        cy.get('#searchInput').should('be.visible').click()
        //Insert text
        let input = "Delhi"
        cy.get('#searchInput').type(input)
        //To select value
        cy.get('.suggestions-dropdown').contains('Delhi University').click()
        //Check the title of the page
        cy.get('#firstHeading').should('have.text', 'Delhi University')

    })

    it("Automate dynamic dropdown", () => {
        cy.visit("https://www.google.com/")
        
        // Check visibility of the search box
        cy.get('#APjFqb').should('be.visible')
        
        // Insert text into the search box
        cy.get('#APjFqb')
            .click()
            .type('cypress automation')
    
        // Wait for suggestions to appear
        cy.wait(1000) // Adjust this as needed to ensure the dropdown appears
    
        // Check the list count
        cy.get('ul[role="listbox"] > li').should('have.length.greaterThan', 0)
        
        // Iterate through the list and click on the desired item
        cy.get('ul[role="listbox"] > li').each(($el) => {
            cy.wrap($el).invoke('text').then((text) => {
                if (text.includes('cypress automation tutorial')) {
                    cy.wrap($el).click()
                }
            })
        })
    
        // Validate the search box value
        cy.get('#APjFqb').should('have.value', 'cypress automation tutorial')
    })

})
