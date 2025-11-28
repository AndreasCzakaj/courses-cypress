describe("CoP QA XXL", () => {
  {
    testIsolation: false;
  }

  // Before all tests: visit the site and accept cookie consent
  before(() => {
    cy.visit("https://www.mercedes-benz-trucks.com");

    // Handle the Usercentrics cookie consent shadow DOM
    cy.get("#usercentrics-root")
      .shadow()
      .find('[data-testid="uc-accept-all-button"]')
      .click({ force: true });
  });

  it("Cypress level 1 - Text is present", () => {
    // Validate that the expected text exists on the page
    cy.contains(
      "Are you ready to become part of this special community"
    ).should("exist");

    // Validate that the same text is actually visible to the user
    cy.contains(
      "Are you ready to become part of this special community"
    ).should("be.visible");
  });

  it("Cypress level 1 - Text is not present", () => {
    // Validate that the text "Zone Management area" does NOT exist on the page
    cy.contains("Zone Management area").should("not.exist");
  });

  it("Cypress level 1 - Text is matching regular expression", () => {
    // Validate that the footer copyright text matches the regex pattern and is visible
    cy.contains(/20[0-9]+ Daimler Truck AG. All rights reserved./)
      .scrollIntoView()
      .should("be.visible");
  });

  it("Cypress level 1 - Text is present but not visible", () => {
    // Validate that the visually hidden H1 exists but is not visible
    cy.contains("Welcome to the world of Mercedes-Benz Trucks")
      .should("exist")
      .and(($el) => {
        const style = getComputedStyle($el[0]);

        // Check that the element is visually hidden using CSS
        expect(style.clip).not.to.eq("auto");
        expect(style.height).to.be.oneOf(["1px", "0px", ""]);
        expect(style.width).to.be.oneOf(["1px", "0px", ""]);
        expect(style.position).to.be.oneOf(["absolute", "fixed"]);
      });
  });

  it("Cypress level 2 - Validate an image element", () => {
    // Loop through each hero image container
    cy.get(".hero-image").each(($heroImage) => {
      cy.wrap($heroImage)
        .scrollIntoView()
        .find("img") // Select the img inside the hero container
        .should(($image) => {
          // Validate that the image is visible
          expect($image).to.be.visible;

          // Validate that the src attribute exists and is not empty
          const src = $image.attr("src");
          expect(src).to.be.a("string").and.not.be.empty;

          // Validate that the CSS aspect-ratio is correct
          expect($image).to.have.css("aspect-ratio", "1 / 1");

          // Validate that the alt attribute exists and is not empty for accessibility
          const alt = $image.attr("alt");
          expect(alt).to.be.a("string").and.not.be.empty;
        });
    });
  });

  it("Cypress level 3 - Validate header navigation", () => {
    // Validate the header container has the correct max-width
    cy.get(".wb-header__inner").should("have.css", "max-width", "1680px");

    // Validate the main navigation is visible
    // and has the correct height and background color
    cy.get(".wb-header__navigation")
      .should("be.visible")
      .and("have.css", "height", "72px")
      .and("have.css", "background-color", "rgba(0, 0, 0, 0)");
  });

  it("Cypress level 4 - Validate flyout navigation", () => {
    // Ensure the flyout menu is initially not present
    cy.get(".wb-flyout-menu").should("not.exist");

    // Click the navigation item "Trucks" to open the flyout menu
    cy.get(".wb-navigation__item").contains("Trucks").click();

    // Validate the flyout menu is now visible
    cy.get(".wb-flyout-menu").should("be.visible");

    // Validate the flyout menu contains expected items
    cy.get(".wb-flyout-menu__item-title").contains("eActros");
    cy.get(".wb-flyout-menu__item-title").contains("eEconic");

    // Close the flyout menu
    cy.get(".wb-flyout-menu__close-button").should("be.visible").click();

    // Ensure the flyout menu is no longer visible after closing
    cy.get(".wb-flyout-menu").should("not.exist");
  });
});
