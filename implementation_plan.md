# Fix Progress and Accuracy Calculation (Delta Protocol)

The user has requested a specific behavior for progress and accuracy reporting:
- **Progress**: Based on the number of completed questions (e.g., 1/20 after question 1).
- **Accuracy**: Based on the number of correct answers relative to the number of completed questions (e.g., 1/1 if the first question is correct).

## Proposed Changes

### Logic Component

#### [MODIFY] [index.html](file:///c:/Users/Laurentiu/Downloads/SpeedyMATE5/logic/index.html)
- Remove `hidden` class from `progress-val` and `accuracy-val` spans to make them visible.

#### [MODIFY] [app.js](file:///c:/Users/Laurentiu/Downloads/SpeedyMATE5/logic/app.js)
- Update `actualizeazaProgresLive` method:
    - Count answered questions.
    - Count correct answers among answered questions.
    - Calculate percentage progress and accuracy based on these counts.
    - Update the text content of `progress-val` and `accuracy-val`.
    - Update progress bars with the new calculated percentages.

## Verification Plan

### Manual Verification
- Start a test.
- Answer the first question correctly.
- Verify that "PROGRES: 1/20, 5%" is displayed.
- Verify that "ACURATEȚE: 1/1, 100%" is displayed.
- Answer the second question incorrectly.
- Verify that "PROGRES: 2/20, 10%" is displayed.
- Verify that "ACURATEȚE: 1/2, 50%" is displayed.
