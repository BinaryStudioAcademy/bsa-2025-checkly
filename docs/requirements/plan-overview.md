# User Story - Plan Overview
> As a Checkly user, I want to view and interact with my generated daily plan, so that I can track, customize, and save my activities.

---

## Acceptance Criteria

### 1. Plan Display
- The page must show the title **“Here’s your plan!”** at the top.
- Each day of the plan is displayed as a vertical list with **1 to 5 activities**.
- Each activity card must include:
 - Task title
 - Short description
 - Time-of-day marker (Morning / Afternoon / Evening)
 - Three action buttons: **Edit (✏️)**, **Replace (🔁)**, and **Complete (✅)**
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
  - Can appear only on hover to reduce visual clutter.

### 4. Global Actions
- **Download PDF** button exports the current plan as a PDF.
- **Save to Profile** button saves the plan to the user’s account (if authenticated).

### 5. Constraints & Notes
- **Regenerate Day** button appears only for the active day.
- Full-day deletion is not allowed; only regeneration is supported.
