Feature: Petstore API - CRUD Operations

  Scenario: Create a new pet
    Given I have a unique pet payload
    When I send a POST request to add the pet
    Then the pet should be created successfully

  Scenario: Update the existing pet
    Given I have an updated pet payload
    When I send a PUT request to update the pet
    Then the pet should be updated successfully

  Scenario: Get the pet details
    When I send a GET request to fetch the pet
    Then the correct pet details should be returned

  Scenario: Delete the pet
    When I send a DELETE request to remove the pet
    Then the pet should be deleted successfully
    And the pet should not exist anymore
