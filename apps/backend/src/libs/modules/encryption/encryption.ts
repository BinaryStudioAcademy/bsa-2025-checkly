import { config } from "~/libs/modules/config/config.js";

import { BaseEncryption } from "./base-encryption.module.js";

const encrypt = new BaseEncryption(config);

export { encrypt };
export { type Encryption } from "./libs/types/types.js";
