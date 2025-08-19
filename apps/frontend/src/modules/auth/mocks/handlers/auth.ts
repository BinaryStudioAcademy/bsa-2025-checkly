import { signInHandlers } from "./sign-in.handler.js";
import { signUpHandlers } from "./sign-up.handler.js";
import { meHandlers } from "./me.handler.js";

const handlers = [...signUpHandlers, ...signInHandlers, ...meHandlers];

export { handlers as authHandlers };
