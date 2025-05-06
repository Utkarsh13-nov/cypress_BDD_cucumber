import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I open the Amphora homepage", () => {
    cy.visit("https://amphora.net/");
  });
  
  When("I go directly to the Newsletter Sign-Up page", () => {
    cy.visit("https://amphora.net/newsletter-sign-up/");
  });
  
  Then("I should be on the Newsletter Sign-up page", () => {
    cy.url().should("include", "/newsletter-sign-up");
    cy.contains("Newsletter Sign Up").should("be.visible");
  });

  Then("Filled all required and Optional fields",()=>{
    cy.get("input[placeholder='eg: john.smith@acmecorp.com']").type("utkarsh@gmail.com")
    cy.get("input[placeholder='eg: John']").type("utkarsh")
    cy.get("input[placeholder='eg: Smith']").type("mandavkar")
    cy.get("button[type='submit']").click()
  })

  Then("Verified Success message",()=>{
    cy.get(".fs-notifier > span").should("include.text","validating negative scenario")
  }) 