import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open the Amphora homepage', () => {
  cy.visit('https://amphora.net/')
})

When('I hover over the Product dropdown', () => {
    cy.get('a:contains("Product")').first().trigger('mouseover', { force: true });
})

Then('I should click each option under the Product dropdown one by one', () => {
    cy.get('a:contains("Product")').first().click({ force: true });
  
    cy.get('li.menu-item-32 ul.sub-menu a').then(($links) => {

      // Convert jQuery object to array of hrefs
      const hrefs = [...$links].map(link => link.href);
  
      // Iterate through each href
      hrefs.forEach((href) => {
        cy.visit('https://amphora.net/');
        cy.get('a:contains("Product")').first().click({ force: true });
  
        // Click the corresponding item by href
        cy.get(`li.menu-item-32 ul.sub-menu a[href="${href}"]`)
          .click({ force: true });
  
        // Confirm navigation
        cy.url().should('include', href);
        cy.wait(1000);
      });
    });
  });
  