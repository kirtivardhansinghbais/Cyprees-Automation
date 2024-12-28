describe('XPath Locators Test', () => {
    it('find number of products with XPath locator', () => {
        cy.visit("http://www.automationpractice.pl/index.php");
        cy.xpath("//*[text()='Best Sellers']").should('be.visible').click();
        cy.xpath("//ul[@id='blockbestsellers']/li").should('have.length', 6);
    });


    it('find number of products with chained XPath locator', () => {
        cy.visit("http://www.automationpractice.pl/index.php");
        cy.xpath("//*[text()='Best Sellers']").should('be.visible').click();
        cy.xpath("//ul[@id='blockbestsellers']").xpath("./li").should('have.length', 6);
    });

});