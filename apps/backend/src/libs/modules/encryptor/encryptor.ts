import { config } from "~/libs/modules/config/config.js";

import { BaseEncryptor } from "./base-encryptor.module.js";
import { DEFAULT_KEY_LENGTH } from "./libs/constants/constants.js";

const encryptor = new BaseEncryptor({
	keyLength: DEFAULT_KEY_LENGTH,
	saltSize: Number(config.ENV.ENCRYPTOR.SALT_SIZE),
});

export { encryptor };
export { type Encryptor } from "./libs/types/encrypt.type.js";
