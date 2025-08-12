# User Story: Quiz

> As a Checkly user, I want to complete an interactive quiz about my goals, habits, and preferences, so that I can receive a personalized daily plan tailored to my lifestyle.

---

## Acceptance Criteria

### 1. **Category Selection (Step 1)**
- Page title: **“Pick the field you'd like to improve”**.
- Display a 3x2 card grid (desktop) or single-column swipe layout (mobile).
 - Each card contains:
   - Icon or image
   - Category label
- Available categories:
  1. Personal development
  2. Spirituality / Mindfulness
  3. Sport / Fitness
  4. Money / Finances
  5. Creativity / Art
  6. Hobby / Experiments
- User can select **only one** category at a time.
- CTA button **“Next”** moves to the quiz step.

### **Quiz Flow (Step 2)**
- Quiz is a **progressive form with 10–15 steps**.
- Progress bar is fixed at the top, showing the number of completed questions.
- Each screen displays **one question at a time**:
  - Question as the heading
  - Supported input types:
    - Radio buttons
    - Checkboxes
    - Sliders (e.g., time per day, experience level)
    - Emoji pickers (e.g., mood, motivation)
    - Free text fields (e.g., preferences, limitations)
- Navigation buttons:
  - **Next** → moves to the next question
  - **Back** → returns to the previous question
  - **Skip** → optional, allows skipping the question
- Last question screen displays a **“Generate My Plan”** button.
  - Clicking this button generates a personalized plan based on user inputs and navigates to the Plan Overview Page.

### **Constraints & Notes**
- Quiz progress must be **automatically saved** so users can return without losing answers.
- User can select one or multiple options, depending on the question type.
- The layout is responsive for desktop and mobile devices.
- Only one question is visible per screen to maintain focus.

