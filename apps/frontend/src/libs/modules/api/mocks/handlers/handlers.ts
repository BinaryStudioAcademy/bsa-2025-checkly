import { authHandlers } from "~/modules/auth/mocks/handlers/auth.js";
import { planHandlers } from "~/modules/plans/mocks/handlers/plan.js";

const handlers = [...authHandlers, ...planHandlers];

export { handlers };
