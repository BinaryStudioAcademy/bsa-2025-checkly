# User Story - Plan Overview
> As a Checkly user, I want to view and interact with my generated daily plan, so that I can track, customize, and save my activities.

---

## Acceptance Criteria

### 1. Plan Display
- The page must show the title **“Here’s your plan!”** at the top.
- Each day of the plan is displayed as a vertical list with **1 to 5 activities**.
- Each activity card must include:
 - Task title
 - Time-of-day marker (Morning / Afternoon / Evening)
 - Four action buttons: **Edit (✏️)**, **Regenerate (🔁)**, **Delete (🗑️)** and **Complete (✅)**
- A task that has the field `is_completed` equal to `true` should be visually highlighted as such, either by reduced opacity, strikethrough text or other way to indicate it.
- **Complete (✅)** is not present in the current design but must be implemented.

### 2. Day Navigation
- A side selector lists all available days (`Day 1` to `Day N`).
- The active day is visually highlighted.
- On **desktop**: the selector remains a vertical sidebar.
- On **mobile**: the sidebar is replaced by a compact button showing the current day.
 - When the user taps it, a dropdown menu shows all available days for selection.

### 3. Day Interactions
- Clicking on a day loads that day tasks on the plan display.
- **Regenerate whole day**:
  - Button available near the active day selector.
  - Clicking the button should open a dialog box for the user to confirm the action. If he then confirms it the whole day is regenerated.

### 4. Task Interactions
- **Edit Button:** Clicking this button should toggle the edit mode for a specific task, and switch the button to a **Save Button**. Edit mode should allow the user to change every field of a task (Time-of-day, title, order)
- **Regenerate Button:** Clicking this button should open a dialog box for the user to confirm the action. If the then confirms it then the task is regenerated.
- **Delete Button:**: Clicking this button should open a dialog box for the user to confirm the action. If he then confirms it then the task should be deleted.
- **Complete Button:** This button resembles a checkmark, clicking it should toggle the task `is_completed` field to `true` or `false` depending on the previous value. The button should be empty when the field is `false` and full when the field is `true`

### 5. Global Actions
- **Download PDF** button exports the current plan as a PDF.
- **Save to Profile** button saves the plan to the user’s account (if authenticated).

### 6. Constraints & Notes
- **Regenerate Day** button appears only for the active day.
- Full-day deletion is not allowed; only regeneration is supported.
