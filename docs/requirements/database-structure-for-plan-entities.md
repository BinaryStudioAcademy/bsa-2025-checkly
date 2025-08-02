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

# 1. Table: plan

Description: represents a plan created by a user, with a certain duration and intensity.

| Column           | Type               | Description                                              | Constraints                                       | Default           |
| ---------------- | ------------------ | -------------------------------------------------------- | ------------------------------------------------- | ----------------- |
| `id`             | SERIAL PRIMARY KEY | Unique identifier for the plan                           | PK                                                | Auto-increment    |
| `title`          | VARCHAR(100)       | Title                                                    | Not null                                          | None              |
| `user_id`        | INT                | Reference to the user who owns the plan                  | Not null, FK → `users(id)`, ON DELETE CASCADE     | None              |
| `duration`    | INT               | The duration of the plan                    | Not null, > 0 | None              |
| `intensity`    | VARCHAR(100)                | The intensity of the plan                    | Not null | None              |
| `created_at`     | TIMESTAMPTZ        | Timestamp when the plan was created                      | Not null                                          | CURRENT_TIMESTAMP |
| `updated_at`     | TIMESTAMPTZ                  | Timestamp of last update                                     | **NOT NULL**                                            | CURRENT\_TIMESTAMP |

# Constraints Explanation:

- when the user is deleted, all their plans are deleted (ON DELETE CASCADE).

# 2. Table: plan_day

Description: represents individual days within a plan.

| Column           | Type               | Description                                           | Constraints                                  | Default        |
| ---------------- | ------------------ | ----------------------------------------------------- | -------------------------------------------- | -------------- |
| `id`             | SERIAL PRIMARY KEY | Unique identifier for the plan day                    | PK                                           | Auto-increment |
| `day_number`     | INT                | Day number within the plan (e.g., 1 for first day)    | Not null, > 0                                | None           |
| `plan_id`        | INT                | Reference to the parent plan                          | Not null, FK → `plan(id)`, ON DELETE CASCADE | None           |
| `created_at`     | TIMESTAMPTZ        | Timestamp when the plan was created                      | Not null                                          | CURRENT_TIMESTAMP |
| `updated_at`     | TIMESTAMPTZ                  | Timestamp of last update                                     | **NOT NULL**                                            | CURRENT\_TIMESTAMP |

# Constraints Explanation:

- deleting a plan deletes its plan days (ON DELETE CASCADE)

# 3. Table: task

Description: represents a task assigned to a particular day within a plan.
| Column           | Type                         | Description                                                  | Constraints                                             | Default            |
| ---------------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------- | ------------------ |
| `id`             | SERIAL PRIMARY KEY           | Unique task identifier                                       | PK                                                      | Auto-increment     |
| `title`          | VARCHAR(200)                 | Task title                                                   | **NOT NULL**                                            | None               |
| `description`    | TEXT                         | Optional detailed description                                | Nullable                                                | NULL               |
| `order`          | INT                          | Order of task execution within the day                       | **NOT NULL**, must be `> 0`                            | None               |
| `plan_day_id`    | INT                          | Reference to the plan day this task belongs to               | **NOT NULL**, FK → `plan_day(id)` **ON DELETE CASCADE** | None               |
| `is_completed`   | BOOLEAN                      | Whether the task is completed                                | **NOT NULL**                                            | FALSE              |
| `execution_time` | execution\_time\_type (ENUM) | Execution time category (`morning`, `afternoon`, `evening`)  | **NOT NULL**                                            | 'morning'               |
| `created_at`     | TIMESTAMPTZ        | Timestamp when the plan was created                      | Not null                                          | CURRENT_TIMESTAMP |
| `updated_at`     | TIMESTAMPTZ                  | Timestamp of last update                                     | **NOT NULL**                                            | CURRENT\_TIMESTAMP |
| `completed_at`   | TIMESTAMPTZ                  | Timestamp when the task was completed                        | Nullable                                                | NULL               |

# Constraints Explanation:

- deleting a plan day deletes all its tasks (ON DELETE CASCADE).
- if the referenced execution time is deleted, the execution_time_id in task is set to NULL.

# Relationships

| Parent Table     | Child Table | Foreign Key         | Cascade Behavior   | Description                              |
| ---------------- | ----------- | ------------------- | ------------------ | ---------------------------------------- |
| `users`          | `plan`      | `user_id`           | ON DELETE CASCADE  | Delete plans if user is deleted          |
| `plan`           | `plan_day`  | `plan_id`           | ON DELETE CASCADE  | Delete plan_days if plan is deleted      |
| `plan_day`       | `task`      | `plan_day_id`       | ON DELETE CASCADE  | Delete tasks if plan_day is deleted      |

# Default Values

| Column           | Default Value     | Meaning                                                       |
| ---------------- | ----------------- | ------------------------------------------------------------- |
| `created_at`     | CURRENT_TIMESTAMP | Automatically stores record creation time                     |
| `is_completed`   | FALSE             | Tasks start as incomplete                                     |
| `updated_at`     | CURRENT_TIMESTAMP | Initially sets update timestamp; should be updated on changes |
| `completed_at`   | NULL              | Task completion time is null until marked completed           |
