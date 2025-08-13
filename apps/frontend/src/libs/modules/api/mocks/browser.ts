import { setupWorker } from "msw/browser";

import { handlers } from "./handlers/handlers.js";

const worker = setupWorker(...handlers);

export { worker };
