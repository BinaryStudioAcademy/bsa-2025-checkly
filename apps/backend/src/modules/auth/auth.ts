import { emailService } from "~/libs/modules/email-service/email-service.js";
import { encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { userService } from "~/modules/users/users.js";

import { passwordTokenService } from "../password-token/password-token.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService(
	userService,
	encryptor,
	emailService,
	passwordTokenService,
);
const authController = new AuthController(logger, authService);

export { authController };
