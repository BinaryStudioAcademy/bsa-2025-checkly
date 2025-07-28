import { config } from "~/libs/modules/config/config.js";

import { BaseTokenModule } from "./base-token.module.js";

const secret = new TextEncoder().encode(config.ENV.TOKEN.SECRET);
const encryption = config.ENV.TOKEN.ENCRYPTION;
const duration = config.ENV.TOKEN.EXPIRATION;

const tokenModule = new BaseTokenModule({ duration, encryption, secret });

export { tokenModule };
