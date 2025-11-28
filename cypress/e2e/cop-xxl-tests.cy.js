describe("CoP QA XXL", () => {
  // Before all tests: visit the site and accept cookie consent
  before(() => {
    cy.visit("https://www.mercedes-benz-trucks.com");

    // Handle the Usercentrics cookie consent shadow DOM
    cy.get("#usercentrics-root").shadow().then($ => {
      if ($.find('[data-testid="uc-accept-all-button"]').length) {
        $.get('[data-testid="uc-accept-all-button"]').click({ force: true })
      }})
  });

  it.skip("Cypress level 1 - Text is present");

  it.skip("Cypress level 1 - Text is not present");

  it.skip("Cypress level 1 - Text is matching regular expression");

  it.skip("Cypress level 1 - Text is present but not visible");

  it.skip("Cypress level 2 - Validate an image element");

  it.skip("Cypress level 3 - Validate header navigation");

  it.skip("Cypress level 4 - Validate flyout navigation");

});
