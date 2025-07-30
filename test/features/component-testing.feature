Feature: WebdriverIO Component Testing

  Scenario: Render a button to the DOM and assert its presence
    Given a button with text "Hello World!" is added to the DOM
    Then the button with text "Hello World!" should be present
    When the button with text "Hello World!" is removed from the DOM
    Then the button with text "Hello World!" should not be present