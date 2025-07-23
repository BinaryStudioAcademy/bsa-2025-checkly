## User Story:

> As a user, I want to create an account using my name, email, and password so I can access the platform and use its features.

## Acceptance Criteria:

### Backend:

Accepts POST request to `/auth/register` with body:

```json
{
  "name": "New User",
  "email": "user@example.com",
  "password": "String123"
}
```

- Required fields: `name`, `email`, `password`

- Email must be in valid format.
  1. **Local part** (before `@`): 1–35 **latin** characters, special characters allowed (```! # $ % & ' * + - / = ? ^ _ ` { | } ~ ```), must not start or end with a dot (`.`), cannot have repeated dots (`..`)
  2. **Domain part** (after `@`): 1-35 **latin** characters, hyphens (`-`) and dots (`.`) are allowed, but not as first or last characters.

- Name must have **at least 3 characters** and **maximum of 32 characters**.
  - Digits and special characters are not allowed.
  - Spaces and hyphens are allowed, as long as they are surrounded by letters.

- Password must have **at least 8 characters** and **maximum of 32 characters**, at least one lowercase and one uppercase and one digit.
  - Spaces are not allowed.

---

### Frontend:

- All form inputs are visible, set to **required** and have their input types set correctly. All form inputs should have a placeholder text.
  1. Name - Text Field
  2. Email Field - Text Field
  3. Password Field - Password Field
  4. Password Confirmation Field - Password Field
  5. Submit Button

- Inputs should be validated both on the frontend and backend.

- Password matching validation: The form is only submitted if both Password and Password Confirmation fields have the same value.

- On success:
  - Redirects to login/dashboard.

- On error:
  - Displays inline red error message (e.g. "Email already in use").
