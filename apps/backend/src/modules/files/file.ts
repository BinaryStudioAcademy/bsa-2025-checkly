import { config } from "~/libs/modules/config/config.js";

import { BaseFileService } from "./file.service.js";

const bucket = config.ENV.S3.BUCKET;
const region = config.ENV.S3.REGION;
const accessKeyId = config.ENV.S3.ACCESS_KEY_ID;
const secretAccessKey = config.ENV.S3.SECRET_ACCESS_KEY;

const fileService = new BaseFileService({
	accessKeyId,
	bucket,
	region,
	secretAccessKey,
});

export { fileService };
