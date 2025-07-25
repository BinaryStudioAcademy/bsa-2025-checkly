**Test Plan for Checkly v1**

### **1\. Test Plan ID**

Checkly-Test-Plan-v1

### **2\. Introduction**

This document outlines the test plan for version 1.0 of **Checkly**, an AI-powered checklist and life planner app. The goal is to ensure a smooth user experience, correct logic in checklist generation, and reliable output formats (PDF, UI). This Test Plan defines the priorities, approach, scope, and responsibilities for QA during this release cycle.

### **3\. Scope**

This plan covers:

- Functional testing of user-facing features.

- API validation for account and checklist flows.

- Validation of edge cases and input errors.

- Checklist generation and output verification.

Excluded:

- Full mobile testing (web only in v1).
- AI engine internals.

### **4\. Feature Priorities**

| **Feature**          | **Priority** | **Notes**                                          |
| -------------------- | ------------ | -------------------------------------------------- |
| Sign Up / Login      | High         | Required to access any personal checklist          |
| Checklist Generation | High         | Core product function                              |
| Task Editing         | Medium       | Not critical to MVP, but must be usable            |
| PDF Export           | Medium       | Format options need visual validation              |
| Quiz Flow            | High         | Must work seamlessly to generate correct checklist |
| Loader Component     | Low          | Only visual polish; not a blocker                  |

### **5\. Test Parameters & Examples**

| **Feature**  | **Sample Input**       | **Expected Result**                           | **Notes**               |
| ------------ | ---------------------- | --------------------------------------------- | ----------------------- |
| Signup       | “abc123” password      | Show “Password must be at least 8 characters” | Error validation        |
| Token Expiry | Use expired JWT        | Return 401 Unauthorized                       | API-level test          |
| Quiz         | Skip required question | Show inline error                             | Client-side validation  |
| Checklist    | AI returns tasks       | Tasks shown in UI in correct order            | UI mapping/testing      |
| Export       | Generate PDF           | PDF is downloaded with selected design        | Format must match theme |

### **6\. Error Handling Cases**

| **Scenario**              | **Expected Behavior**                        |
| ------------------------- | -------------------------------------------- |
| Invalid login credentials | Show error: "Email or password is incorrect" |
| Weak password             | Block submission + show validation           |
| 500 API failure           | Show fallback error message in UI            |
| Quiz skipped or broken    | Prevent next step until complete             |

### **7\. API Response Schemas**

####

_To be added once devs provide the Swagger API endpoints_

###

###

### **8\. Test Approach**

#### **🖥️ Frontend**

- Manual testing of:
  - Navigation flows (signup, login, quiz, checklist, export)

  - Error messages and edge cases

  - Responsive behavior (mobile/web)

- Usability feedback from testers

#### **🛠️ Backend (API)**

- Automated API tests (Postman and/or Playwright API mode)
  - Login / Token / Fetch User

  - Checklist generation

  - Export trigger

- Schema validation using helper functions (e.g., Zod, JSON schema)

### **9\. Automation Scope**

###

| **Area**           | **Automate?** | **Tool**              |
| ------------------ | ------------- | --------------------- |
| Authentication API | ✅            | Playwright/Postman    |
| Checklist API      | ✅            | Playwright/Postman    |
| Frontend UI        | ❌            | Manual only in v1     |
| PDF Output         | ❌            | Manual visual testing |

### **10\. Features Planned (v1)**

- Signup (email/password)

- Login (JWT-based)

- Quiz flow to collect user goals

- Checklist generation from AI

- Task editing / customization

- PDF export (light/dark themes)

###

### **11\. Features Implemented**

_(As of writing: none implemented yet. This section will be updated sprint by sprint.)_

### **12\. Timeline and Demo Milestones**

| **Item**       | **Status** | **Date**   |
| -------------- | ---------- | ---------- |
| Project Start  | Started    | 21/07/2025 |
| Demo Date      | \-         | 22/08/2025 |
| Feature Freeze | \-         | 29/08/2025 |
| MVP Deadline   | \-         | 30/08/2025 |

### **13\. Team availability hours**

| **Name**   | **Role** | **Schedule**            |
| ---------- | -------- | ----------------------- |
| ---        | ---      | ---                     |
| Ivan Spada | QA       | 13:00 - 21:00hs (GMT-3) |
| ---        | ---      | ---                     |
| ---        | ---      | ---                     |
