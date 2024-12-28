describe('Handel tables', (() => {

    beforeEach('login',()=>{
        //Visit site
        cy.visit('https://demo.opencart.com/admin/index.php')
        //Enter user name
        cy.get("#input-username").clear()
        .should("be.visible").type("demo")
        //Enter password
        cy.get("#input-password").clear()
        .should("be.visible").type("demo")
        //Click submit
        cy.get("button[type='submit']").should("be.visible").click()
        //Close pop up
        //cy.get(".btn-close").click()
        //Click on customer main menu
        cy.get("#menu-customer>a").should("be.visible").click()
        ///Click on sub menu
        cy.get("#menu-customer>ul>li:first-child").should("be.visible").click()

    })

    it("check numbers of rows and columns", () => {
        //Get rows of the table
        cy.get("table[class='table table-bordered table-hover']>tbody>tr").should('have.length','10')
        //Get colums of the table
        cy.get("table[class='table table-bordered table-hover']>thead>tr>td").should('have.length','6')
       
    })

    it("check cell data from specific row and column", () => {
       //Get data from a cell
       cy.get("table[class='table table-bordered table-hover']>tbody>tr:nth-child(5)>td:nth-child(3)").contains("leduyquan25741244@gmail.com")
        
    })

    it("Read all the rows and columns data in the first page", () => {
        // Get all rows from the table
        cy.get("table[class='table table-bordered table-hover']>tbody>tr").each(($row, rowIndex) => {
            cy.wrap($row).within(() => {
                // Get all columns within the current row
                cy.get("td").each(($col, colIndex) => {
                    // Log the text of each column
                    cy.log(`Row ${rowIndex + 1}, Column ${colIndex + 1}: ${$col.text()}`)
                })
            })
        })
    })

    it.only("Pagination", () => {
        let totalPages
      
        // Capture total number of pages from the text
        cy.get(".col-sm-6.text-end").then((e) => {
          const mytext = e.text()
          totalPages=mytext.substring(mytext.indexOf("(")+1,mytext.indexOf("Pages")-1) // Extract total pages dynamically
          cy.log("Total pages = " + totalPages)
      
          // Use a for loop for pagination
          for (let p = 1; p <= totalPages; p++) {
            cy.log("Navigating to Page: " + p)
      
            // Click on the page number dynamically
            cy.get(`ul[class='pagination']>li`).contains(p.toString()).click()
      
            // Wait for the table to load
            cy.wait(1000) // Optional wait for page stability
      
            // Iterate through table rows and log the 3rd column (e.g., email)
            cy.get("table[class='table table-bordered table-hover']>tbody>tr").each(($row, rowIndex) => {
              cy.wrap($row)
                .find("td:nth-child(3)") // Select 3rd column
                .then(($col) => {
                  cy.log(`Page ${p}, Row ${rowIndex + 1}, Email: ${$col.text()}`)
                })
            })
          }
        })
      })
    
}))

