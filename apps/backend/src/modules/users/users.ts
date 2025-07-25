import { encryptor } from "~/libs/modules/encryptor/encryptor.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { UserController } from "./user.controller.js";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, encryptor);
const userController = new UserController(logger, userService);

export { userController, userService };
export { type UserSignInRequestDto } from "./libs/types/types.js";
export { type UserSignUpRequestDto } from "./libs/types/types.js";
export { userSignInValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
export { userSignUpValidationSchema } from "./libs/validation-schemas/validation-schemas.js";
