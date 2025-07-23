## User Story:

> As a user, I want to log into my account using my email and password so I can access my saved plans.

## Acceptance Criteria:

### Backend:

Accepts POST request to `/auth/login` with body:

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

- Required fields: `email`, `password`

- Email must be in valid format.
  1. **Local part** (before `@`): 1–35 **latin** characters, special characters allowed, must not start or end with a dot (`.`), cannot have repeated dots (`..`)
  2. **Domain part** (after `@`): 1-35 **latin** characters, hyphens (`-`) and dots (`.`) are allowed, but not as first or last characters.

- Password must have **at least 8 characters** and **maximum of 32 characters**, at least one lowercase and one uppercase and one digit.
  - Spaces are not allowed.

---

### Frontend

- Displays login form with `email` and `password` inputs
  - All fields should be required, have their types set correctly and have placeholder text.

- Before submission, fields must be validated for:
  - Email format.
  - Input values minimum and maximum lengths.

- On success:
  - Redirects user to the dashboard.

- On error:
  - Displays inline red error message from backend on failure.
