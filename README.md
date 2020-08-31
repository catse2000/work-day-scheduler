# Work Day Scheduler Starter Code

## User Story
![User Story Screenshot](./assets/img/userStory.png)

## Acceptance Criteria
![Acceptance Criteria Screenshot](./assets/img/criteria.png)

## Mockup
![Mockup Screenshot](./assets/img/mockup-1.png)

## Work Done

### Initial Program
* Updated index.html to support time block creation
* Created loadEvents() to act on load and update "p" element in header with today's date
* loadEvents() all prompts the createBlocks() to create the various time blocks throughout the day
* used momentjs to determine today's date, and the hour for every timeblock

### Edit Events
* add click event that turns "span" element into a "textarea" element so that text can be edited
    * click event takes text from "span" and stores it in a variable
    * new "textarea" element is created
    * "span" element is replaced with "textarea" element and includes previous text for editing
    * focus is placed on "textarea"
* add click event to end editing and save to program when "saveBtn" is clicked
    * click event takes text from "textarea" and stores it in a variable
    * click event takes index of "li" and stores it
    * new "span" element is created with className of previous "span" element
    * "textarea" is replaced by new "span" element with new edited text on "saveBtn" click

### Data Persistence
* when clicking "save" button application stores changes to "this" textarea in local storage
* when application loads, it checks for content in local storage
    * if index in local storage does not have content, "span" element is updated with ''

### Task Colors
* created changeBackground() function to handle the change of task background colors during load, and when a task is edited
* variable is passed to changeBackground() an an if statement determines what time it is and returns a value
* "hour" variable is compared against currentTime variable, which pulls the current hour, to determine what color the background should be
    * if "hour" is less than "currentTime" the class "past" is added to description
    * if "hour" is equal to "currentTime" the class "present" is added to description
    * if "hour" is more than "currentTime" the class "future" is added to description

### Commenting and Code Cleanup
