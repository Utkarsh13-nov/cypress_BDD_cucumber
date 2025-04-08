Feature: Access Newsletter Sign-Up page

  Scenario: User goes directly to the Newsletter Sign-Up page
    Given I open the Amphora homepage
    When I go directly to the Newsletter Sign-Up page
    Then I should be on the Newsletter Sign-up page
    Then Filled all required and Optional fields
    Then Verified Success message
