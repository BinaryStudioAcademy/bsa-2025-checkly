import { encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService(userService, encryptor);
const authController = new AuthController(logger, authService);

export { authController };
