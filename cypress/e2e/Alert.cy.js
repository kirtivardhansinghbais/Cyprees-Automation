describe('Alerts', () => {

    it("js alert", () => {
        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
        cy.get("button[onclick='jsAlert()']")
            .should('exist') // Ensure the button exists in the DOM
            .should('be.visible') // Ensure the button is visible
            .click({ force: true }) // Force the click if necessary (e.g., if an overlay is blocking it)

        // Handle the alert box
        cy.on('window:alert', (alertText) => { //cypress automatically close alert window by clicking ok
            // Assert the alert text
            expect(alertText).to.equal('I am a JS Alert')
        })

        // Verify the result message after interacting with the alert
        cy.get('#result').should('have.text', 'You successfully clicked an alert')
    })

    it("Js confirm alert with ok button", () => {
        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
        cy.get("button[onclick='jsConfirm()']")
            .should('be.visible') // Ensure the button is visible
            .click() // click 

        // Handle the alert box
        cy.on('window:confirm', (alertText) => { //cypress automatically close alert window by clicking ok
            // Assert the alert text
            expect(alertText).to.equal('I am a JS Confirm')
        })

        // Verify the result message after interacting with the alert
        cy.get('#result').should('have.text', 'You clicked: Ok')
    })

    it("Js confirm alert with cancel button", () => {
        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
        cy.get("button[onclick='jsConfirm()']")
            .should('be.visible') // Ensure the button is visible
            .click() // click 

        // Handle the alert box
        cy.on('window:confirm', (alertText) => {
            // Assert the alert text
            expect(alertText).to.contains('I am a JS Confirm')
        })

        cy.on('window:confirm',()=>false);// close alert using cancel button

        // Verify the result message after interacting with the alert
        cy.get('#result').should('have.text', 'You clicked: Cancel')
    })

    it("Js prompt alert with ok button", () => {
        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
        cy.window().then((win)=>{
            cy.stub(win,'prompt').returns('welcome')
        })
        cy.get("button[onclick='jsPrompt()']")
            .should('be.visible') // Ensure the button is visible
            .click() // click 

            // Verify the result message after interacting with the alert
        cy.get('#result').should('have.text', 'You entered: welcome')
    })

    it("Js prompt alert with cancel button", () => {
        cy.visit('http://the-internet.herokuapp.com/javascript_alerts')
        cy.window().then((win)=>{
            cy.stub(win,'prompt').returns('null')
            
        })
        cy.get("button[onclick='jsPrompt()']")
            .should('be.visible') // Ensure the button is visible
            .click() // click 

        //close alert using cancel button
        cy.on('window:prompt',()=>false)

        // Verify the result message after interacting with the alert
        cy.get('#result').should('have.text', 'You entered: null')
    })

    it("Authenticated alert", () => {
        cy.visit("http://the-internet.herokuapp.com/basic_auth", {
            auth: {
                username: "admin", // Correct key name
                password: "admin"
            }
        })
    
        // Verify successful authentication
        cy.contains("Congratulations! You must have the proper credentials.").should("be.visible")

        cy.visit("http://admin:admin@the-internet.herokuapp.com/basic_auth")

        // Verify successful authentication
        cy.contains("Congratulations! You must have the proper credentials.").should("be.visible")
    })

    it("Authenticated alert by passing user name and paswword with url", () => {
    cy.visit("http://admin:admin@the-internet.herokuapp.com/basic_auth")

    // Verify successful authentication
    cy.get("div[class='example'] p").should('have.contain',"Congratulations! You must have the proper credentials.")
    })
})

