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
	EMAIL_SERVICE: {
		EMAIL_API_KEY: string;
		RESET_PASSWORD_LINK: string;
	};
	ENCRYPTOR: {
		SALT_SIZE: number;
	};
	FRONTEND: {
		PLAN_PRINT_URL: string;
		PLAN_PRINT_URL_PRODUCTION: string;
	};
	OPEN_AI: {
		OPEN_AI_KEY: string;
		TEXT_GENERATION_MODEL: string;
	};
	PASSWORD_TOKEN: {
		KEY_SIZE: number;
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
