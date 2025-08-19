import { type AppEnvironment } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type EnvironmentSchema = {
	APP: {
		ENVIRONMENT: ValueOf<typeof AppEnvironment>;
		HOST: string;
		PORT: number;
	};
	DB: {
		CONNECTION_STRING: string;
		DIALECT: string;
		POOL_MAX: number;
		POOL_MIN: number;
	};
	ENCRYPTOR: {
		SALT_SIZE: number;
	};
	OPEN_AI: {
		OPEN_AI_KEY: string;
		TEXT_GENERATION_MODEL: string;
	};
	S3: {
		ACCESS_KEY_ID: string;
		BUCKET: string;
		REGION: string;
		SECRET_ACCESS_KEY: string;
	};
	TOKEN: {
		ENCRYPTION: string;
		EXPIRATION: string;
		SECRET: string;
	};
};

export { type EnvironmentSchema };
