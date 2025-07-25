import { config } from "~/libs/modules/config/config.js";

import { BaseEncryptor } from "./base-encryptor.module.js";

const encryptor = new BaseEncryptor({
	saltSize: config.ENV.ENCRYPTOR.SALT_SIZE,
});

export { encryptor };
export {
	type EncryptedData,
	type Encryptor,
} from "./libs/types/encrypt.type.js";
