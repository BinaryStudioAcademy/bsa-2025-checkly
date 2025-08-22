import convict, { type Config as LibraryConfig } from "convict";
import { config } from "dotenv";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type Config, type EnvironmentSchema } from "./libs/types/types.js";

class BaseConfig implements Config {
	public ENV: EnvironmentSchema;
	private logger: Logger;

	private get envSchema(): LibraryConfig<EnvironmentSchema> {
		return convict<EnvironmentSchema>({
			APP: {
				ENVIRONMENT: {
					default: null,
					doc: "Application environment",
					env: "NODE_ENV",
					format: Object.values(AppEnvironment),
				},
				HOST: {
					default: null,
					doc: "Host for server app",
					env: "HOST",
					format: String,
				},
				PORT: {
					default: null,
					doc: "Port for incoming connections",
					env: "PORT",
					format: Number,
				},
			},
			DB: {
				CONNECTION_STRING: {
					default: null,
					doc: "Database connection string",
					env: "DB_CONNECTION_STRING",
					format: String,
				},
				DIALECT: {
					default: null,
					doc: "Database dialect",
					env: "DB_DIALECT",
					format: String,
				},
				POOL_MAX: {
					default: null,
					doc: "Database pool max count",
					env: "DB_POOL_MAX",
					format: Number,
				},
				POOL_MIN: {
					default: null,
					doc: "Database pool min count",
					env: "DB_POOL_MIN",
					format: Number,
				},
			},
			EMAIL_SERVICE: {
				EMAIL_API_KEY: {
					default: null,
					doc: "API key for email service",
					env: "EMAIL_API_KEY",
					format: String,
				},
				RESET_PASSWORD_LINK: {
					default: null,
					doc: "Link to reset password",
					env: "RESET_PASSWORD_LINK",
					format: String,
				},
			},
			ENCRYPTOR: {
				SALT_SIZE: {
					default: null,
					doc: "Salt size for encryption",
					env: "SALT_SIZE",
					format: Number,
				},
			},
			FRONTEND: {
				PLAN_PRINT_URL: {
					default: null,
					doc: "Frontend plan print URL",
					env: "FRONTEND_PLAN_PRINT_URL",
					format: String,
				},
			},
			OPEN_AI: {
				OPEN_AI_KEY: {
					default: null,
					doc: "OpenAI API key",
					env: "OPEN_AI_KEY",
					format: String,
				},
				TEXT_GENERATION_MODEL: {
					default: null,
					doc: "OpenAI text generation model",
					env: "TEXT_GENERATION_MODEL",
					format: String,
				},
			},
			S3: {
				ACCESS_KEY_ID: {
					default: null,
					doc: "S3 access key ID",
					env: "AWS_ACCESS_KEY_ID",
					format: String,
				},
				BUCKET: {
					default: null,
					doc: "S3 bucket name",
					env: "AWS_S3_BUCKET",
					format: String,
				},
				REGION: {
					default: null,
					doc: "S3 region",
					env: "AWS_REGION",
					format: String,
				},
				SECRET_ACCESS_KEY: {
					default: null,
					doc: "S3 secret access key",
					env: "AWS_SECRET_ACCESS_KEY",
					format: String,
				},
			},
			TOKEN: {
				ENCRYPTION: {
					default: null,
					doc: "Encryption algorithm for JWTs",
					env: "JWT_ENCRYPTION",
					format: String,
				},
				EXPIRATION: {
					default: null,
					doc: "Expiration time for JWTs",
					env: "JWT_EXPIRATION",
					format: String,
				},
				SECRET: {
					default: null,
					doc: "Secret key for JWTs",
					env: "JWT_SECRET_KEY",
					format: String,
				},
			},
		});
	}

	public constructor(logger: Logger) {
		this.logger = logger;

		config();

		this.envSchema.load({});
		this.envSchema.validate({
			allowed: "strict",
			output: (message) => {
				this.logger.info(message);
			},
		});

		this.ENV = this.envSchema.getProperties();
		this.logger.info(".env file found and successfully parsed!");
	}
}

export { BaseConfig };
