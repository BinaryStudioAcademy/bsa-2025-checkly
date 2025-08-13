# BSA 2025 – Checkly Automation Testing

Automated API and UI tests for the Checkly monorepo, developed as part of the Binary Studio Academy 2025 program.

This package uses [Playwright](https://playwright.dev/) to test both backend and frontend functionality of Checkly.
Includes Continuous Integration via GitHub Actions and generates HTML test reports as build artifacts.

---

## 📦 Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Faker](https://www.npmjs.com/package/@faker-js/faker) – fake test data
- [Ajv](https://ajv.js.org/) – schema validation
- [dotenv](https://www.npmjs.com/package/dotenv) – environment configuration
- GitHub Actions – CI/CD pipeline

---

## 🚀 Getting Started

### 1. Install dependencies (from the monorepo root)

```bash
npm install
```

> 🛠 This will also automatically install Playwright browsers for testing.

### 2. Environment variables

Create `.env.local` and `.env.production` inside `packages/testing/`:

```env
# Local environment
FRONTEND_URL=http://localhost:3000/
API_URL=http://localhost:3001/api/v1/

# Production environment
FRONTEND_URL=http://checkly.eu-north-1.elasticbeanstalk.com/
API_URL=http://checkly.eu-north-1.elasticbeanstalk.com/api/v1/
```

> ⚠ **Important:** Make sure URLs end with a `/`.

---

## 🧪 Running the Tests

From the **monorepo root**:

```bash
npm run testing:test       # Run all tests (local env)
npm run testing:ui         # Run only UI tests
npm run testing:api        # Run only API tests
npm run testing:report     # View the last HTML report
```

---

## 📂 Folder Structure

```
packages/testing
├── .env.example
├── .env.local
├── .env.production
├── .gitignore
├── package.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
├── playwright-report/ # HTML report
└── tests/
├── api/
│ ├── auth/
│ ├── controllers/
│ ├── fixtures/
│ ├── helpers/
│ └── schemas/
├── ui/
│ ├── auth/
│ ├── controllers/
│ ├── fixtures/
│ ├── helpers/
│ └── landing/
└── utils/
```

---

## ✨ Features

- ✅ Separate UI and API projects
- ✅ Page Object Model for UI
- ✅ Faker for type-safe test data
- ✅ Ajv for schema validation
- ✅ Multi-environment support via `.env` files
- ✅ CI-ready with GitHub Actions

---

## 📌 TODO

- [ ] Integrate CI workflow (`playwright.yml`)
