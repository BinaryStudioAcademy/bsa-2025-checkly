import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";

import { S3BucketIndex } from "~/libs/enums/enums.js";

type Constructor = {
	accessKeyId: string;
	bucket: string;
	region: string;
	secretAccessKey: string;
};

class BaseFileService {
	private bucket: string;
	private region: string;
	private s3: S3Client;

	public constructor({
		accessKeyId,
		bucket,
		region,
		secretAccessKey,
	}: Constructor) {
		this.bucket = bucket;
		this.region = region;
		this.s3 = new S3Client({
			credentials: {
				accessKeyId,
				secretAccessKey,
			},
			region: this.region,
		});
	}

	public async delete(fileUrl: string): Promise<void> {
		const key = this.extractKeyFromUrl(fileUrl);

		if (!key) {
			return;
		}

		await this.s3.send(
			new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
		);
	}

	public async uploadUserAvatar(
		buffer: Buffer,
		mimeType: string,
		originalName?: string,
	): Promise<string> {
		const safeName = (originalName || "upload").replaceAll(/\s+/g, "-");
		const key = `avatars/${randomUUID()}-${safeName}`;

		await this.s3.send(
			new PutObjectCommand({
				Body: buffer,
				Bucket: this.bucket,
				ContentType: mimeType,
				Key: key,
			}),
		);

		return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
	}

	private extractKeyFromUrl(url: string): null | string {
		try {
			const parsed = new URL(url);

			if (parsed.hostname.startsWith(`${this.bucket}.s3.`)) {
				return parsed.pathname.replace(/^\//, "");
			}

			const parts = parsed.pathname.split("/").filter(Boolean);

			if (parts[S3BucketIndex.PARTS] === this.bucket) {
				return parts.slice(S3BucketIndex.START_AFTER).join("/");
			}

			return null;
		} catch {
			return null;
		}
	}
}

export { BaseFileService };
