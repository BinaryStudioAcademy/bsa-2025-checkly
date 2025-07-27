## User Story:

> As a user, I want to understand how the platform works and easily start my personal development plan to improve different areas of my life.

---

## Acceptance Criteria:

### 0. All Components

- The homepage and all of its components must be fully responsive, adapting its layouts fluidly to different screen sizes while maintaing adequate spacing.
- Images must scale without distortion or overflow.


### 1. Header

- Displays platform logo on the top-left.
- Displays two buttons on the top-right:
  - `Start Quiz`: primary CTA to initiate the user flow. Clicking it triggers the quiz.
  - `Sign In`: when user is not logged in.
  - `Profile`: replaces "Sign In" when user is authenticated.
- (Optional) Language switcher is available if implemented.
- The header should be responsive and adapt to different screen sizes.

### 2. Hero Section

- Title is displayed: `Create a personal development plan in 2 minutes`.
- Subtitle is displayed: `AI-powered checklist generator for your goals — from fitness to creativity`.
- CTA Button labeled `Start` is centered below the subtitle.
- Clicking `Start` triggers the quiz.

### 3. How It Works

- Section displays 3 steps visually with arrow transitions:
  1. **Take the quiz**
  2. **Get your plan**
  3. **Download PDF or customize it**

### 4. Categories Section

- Section is titled `Categories`.
- Displays 6 clickable category :
  - Personal Development
  - Spirituality
  - Sport
  - Money
  - Creativity
  - Hobby
- Each card includes:
  - Unique color and icon
  - Label (category name)
- On click:
  - Starts quiz with category pre-selected.

### 5. Visual Layout Previews

- Section is titled `Sample visual layouts`.
- Displays sample layout cards:
  - Minimalistic
  - Colorful
  - Motivational
  - With spaces for notes
- Cards are displayed in a grid or slider format.
- Each card is a screenshot of a generated PDF layout.
- Each card has a label with the template/layout name.

### 6. Testimonials Section

- Section is titled `Testimonials`.
- Displays user quotes cards with:
  - Short paragraph of placeholder or real feedback
  - Avatar
  - Name (e.g. Roy, Emma, Joan)

### 7. Footer

- Displays:
  - Platform logo (bottom-left)
  - 3 links: `Terms of Service`, `Privacy Policy`, `Contact Us`
  - Social media icons (bottom-right).
