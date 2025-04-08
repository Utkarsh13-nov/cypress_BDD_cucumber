import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const baseUrl = "https://petstore.swagger.io/v2/pet";
let petId;
let newPet;
let updatedPet;

// Create Pet Payload
Given("I have a unique pet payload", () => {
  petId = Math.floor(Math.random() * 1000000);
  newPet = {
    id: petId,
    name: "TestPaws",
    photoUrls: ["http://example.com/pet.jpg"],
    status: "available",
  };
});

// POST - Add Pet
When("I send a POST request to add the pet", () => {
  cy.request("POST", baseUrl, newPet).as("createPetResponse");
});

// Assert POST response
Then("the pet should be created successfully", () => {
  cy.get("@createPetResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.id).to.eq(petId);
    expect(response.body.name).to.eq("TestPaws");
  });
});

// Prepare updated pet payload
Given("I have an updated pet payload", () => {
  updatedPet = {
    id: petId,
    name: "TestPawsUpdated",
    photoUrls: ["http://example.com/updated.jpg"],
    status: "sold",
  };
});

// PUT - Update Pet
When("I send a PUT request to update the pet", () => {
  cy.request("PUT", baseUrl, updatedPet).as("updatePetResponse");
});

// Assert PUT response
Then("the pet should be updated successfully", () => {
  cy.get("@updatePetResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.name).to.eq("TestPawsUpdated");
    expect(response.body.status).to.eq("sold");
  });
});

// GET - Fetch Pet
When("I send a GET request to fetch the pet", () => {
  cy.request("GET", `${baseUrl}/${petId}`).as("getPetResponse");
});

// Assert GET response
Then("the correct pet details should be returned", () => {
  cy.get("@getPetResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.id).to.eq(petId);
    expect(response.body.name).to.eq("TestPawsUpdated");
    expect(response.body.status).to.eq("sold");
  });
});

// DELETE - Remove Pet
When("I send a DELETE request to remove the pet", () => {
  cy.request("DELETE", `${baseUrl}/${petId}`).as("deletePetResponse");
});

// Assert DELETE response
Then("the pet should be deleted successfully", () => {
  cy.get("@deletePetResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.message).to.eq(petId.toString());
  });
});

// Confirm deletion
Then("the pet should not exist anymore", () => {
  cy.request({
    method: "GET",
    url: `${baseUrl}/${petId}`,
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(404);
  });
});
