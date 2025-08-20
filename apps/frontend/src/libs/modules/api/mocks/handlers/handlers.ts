import { authHandlers } from "~/modules/auth/mocks/handlers/auth.js";
import { planHandlers } from "~/modules/plans/mocks/handlers/plan.js";
import { taskHandlers } from "~/modules/tasks/mocks/handlers/task.js";

const handlers = [...authHandlers, ...planHandlers, ...taskHandlers];

export { handlers };
