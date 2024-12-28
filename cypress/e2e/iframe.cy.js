import 'cypress-iframe'

describe('handling frames', () => {
    it('iframe handling approach 1', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe')

        // Ensure any overlay or modal is handled
        cy.get('[aria-label="Close"]').click({ force: true })

        // Access the iframe and ensure its body is editable
        cy.get('#mce_0_ifr')
            .its('0.contentDocument.body')
            .should('be.visible') // Ensure the iframe body is visible
            .then(cy.wrap) // Wrap the body to interact with it
            .then((body) => {
                // Ensure the contenteditable attribute is set to true
                if (body.attr('contenteditable') !== 'true') {
                    body.attr('contenteditable', 'true')
                }
                cy.wrap(body).clear().type("Welcome").type('{selectall}')
            })

        cy.get("[aria-label='Bold']")
            .then((button) => {
                // Change the `aria-disabled` attribute to false
                button[0].setAttribute('aria-disabled', 'false')
            })
            .should('have.attr', 'aria-disabled', 'false') // Verify the change
            .click(); // Click the bold button
    })

    it('iframe handling approach 2', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe')
        //Calling custom command
        cy.getIframe('#mce_0_ifr')
            .then((body) => {
                // Ensure the contenteditable attribute is set to true
                if (body.attr('contenteditable') !== 'true') {
                    body.attr('contenteditable', 'true')
                }
                cy.wrap(body).clear().type("Welcome").type('{selectall}')
            })

        cy.get("[aria-label='Bold']")
            .then((button) => {
                // Change the `aria-disabled` attribute to false
                button[0].setAttribute('aria-disabled', 'false')
            })
            .should('have.attr', 'aria-disabled', 'false') // Verify the change
            .click(); // Click the bold button
    })

    it('iframe handling approach 3 by plugin', () => {
        cy.visit('https://the-internet.herokuapp.com/iframe')
        //load the iframe
        cy.frameLoaded('#mce_0_ifr')
           cy.iframe('#mce_0_ifr').clear().type("Welcome").type('{selectall}')
            

        cy.get("[aria-label='Bold']")
            .then((button) => {
                // Change the `aria-disabled` attribute to false
                button[0].setAttribute('aria-disabled', 'false')
            })
            .should('have.attr', 'aria-disabled', 'false') // Verify the change
            .click(); // Click the bold button
    })


})
