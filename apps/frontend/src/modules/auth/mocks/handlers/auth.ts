import { signInHandlers } from "./sign-in.handler.js";
import { signUpHandlers } from "./sign-up.handler.js";

const handlers = [...signUpHandlers, ...signInHandlers];

export { handlers as authHandlers };
