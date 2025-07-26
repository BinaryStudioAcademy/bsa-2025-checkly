# Plan overview page

## 1. Quiz and Plan Generation
- Based on quiz results, a personalized plan is generated.
- The plan has:
  - A defined duration: **5, 14, or 21 days**.
  - Each duration should have its **intensity** and **frequency** of the task.
- Each user can have **multiple plans**.
- Plans are **personalised and cannot be shared**.

---

## 2. Plan Management
A user can:
- View all generated plans.
- Regenerate a plan (partially or completely).
- Regenerate a specific day or task.
- Edit individual task text.

Additional details:
- A plan stores its origin:
  - Reference to the plan it was regenerated from.
- Plans have an **active status** (e.g., only one active plan at a time).
- Plan **creation timestamp** is recorded.
- Plans have a list of **days (`plan_day`)**, and each day has:
  - An order number.
  - A list of tasks.

---

## 3. Task Structure & Tracking
- Each day (`plan_day`) has **1–5 tasks**, but the data model should allow any number of tasks per day.
- Tasks contain:
  - Plain text **title** and **description**.
  - Optional **tip**.
  - **Execution time** (morning, afternoon, evening).
  - **Order** within the day.
  - **Timestamps** for updates and completion.
- Tasks can be marked as **complete/incomplete**.
- Tasks do not have deadlines or unlock timers.

---

## 4. Progress & History
The system tracks:
- **History of checklists** should be saved.
- **History of plans**, so a user can return to and update previous plans.

```mermaid
erDiagram
  users ||--o{ plan : "has"
  users {
      int id PK
      dateTime created_at
      dateTime updated_at
      varchar email
      varchar name
      text password_hash
      text password_salt
  }

  intensity ||--o{ duration : "has"
  intensity o|--|| level_type : "enum:level_type"
  intensity {
      int id PK
      enum level_type
      int min_tasks_per_day
      int max_tasks_per_day
  }

  level_type {
      low low
      medium medium
      high high
  }

  duration ||--o{ plan : "defines"
  duration {
      int id PK
      int number_of_day
      int intensity_id FK
  }

  plan ||--|{ plan_day : "has"
  plan ||--o| plan : "regenerated from"
  plan {
      int id PK
      varchar title
      int user_id FK
      int duration_id FK
      int regenerated_from_id FK
      boolean is_active
      dateTime created_at
  }

  plan_day ||--|{ task : "has"
  plan_day {
      int id PK
      int day_number
      boolean is_regenerated
      int plan_id FK
  }

  task {
      int id PK
      varchar title
      text description
      int order
      int plan_day_id FK
      boolean is_completed
      int execution_time_id FK
      dateTime updated_at
      dateTime completed_at
  }

  execution_time ||--o{ task : "used in"
  execution_time o|--|| execution_time_type : "enum:execution_time_type"
  execution_time {
      int id PK
      enum execution_time_type
      time start_time
      time end_time
  }

  execution_time_type {
      morning morning
      afternoon afternoon
      evening evening
  }
```
