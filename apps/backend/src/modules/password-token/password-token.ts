import { encryptor } from "~/libs/modules/encryptor/encryptor.js";

import { PasswordTokenModel } from "./password-token.model.js";
import { PasswordTokenRepository } from "./password-token.repository.js";
import { PasswordTokenService } from "./password-token.service.js";

const passwordTokenRepository = new PasswordTokenRepository(PasswordTokenModel);
const passwordTokenService = new PasswordTokenService(
	passwordTokenRepository,
	encryptor,
);

export { passwordTokenService };
