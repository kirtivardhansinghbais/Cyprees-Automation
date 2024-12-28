describe('Assertions', () => {

    it("Implicit Assertion", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.url().should('include', "orangehrmlive.com")
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.url().should('contain', 'orangehrm')
 
    })

    it("Implicit Assertion and", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.url().should('include', "orangehrmlive.com")
            .and('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            .and('contain', 'orangehrm')
        cy.title().should('include', 'Orange')
            .and('eq', 'OrangeHRM')
            .and('not.contain', 'mango')

        cy.get('.orangehrm-login-branding > img').should('exist')
            .and('be.visible')
        cy.xpath("//a").should('have.length', 5)

        cy.get("input[placeholder='Username']").type("Admin")
        cy.get("input[placeholder='Username']").should('have.value', 'Admin')
    })

    it("Explicit Assertion expect", () => {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.get("input[placeholder='Username']").type("Admin")
        cy.get("input[placeholder='Password']").type("admin123")
        cy.get("button[type='submit']").click()

        let expName = "xyz"
        cy.get(".oxd-userdropdown-name").then((x) => {
            let actName = x.text()
            //BDD Style
            expect(actName).to.not.equal(expName)
            //TDD Style
            assert.notEqual(actName, expName)
        }
        )
    })

})