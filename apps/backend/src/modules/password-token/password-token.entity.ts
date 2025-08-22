import { type Entity } from "~/libs/types/types.js";

class PasswordTokenEntity implements Entity {
	private expirationDate: Date;

	private id: null | number;

	private tokenHash: string;

	private tokenSalt: string;

	private userId: number;

	private constructor({
		expirationDate,
		id,
		tokenHash,
		tokenSalt,
		userId,
	}: {
		expirationDate: Date;
		id: null | number;
		tokenHash: string;
		tokenSalt: string;
		userId: number;
	}) {
		this.expirationDate = expirationDate;
		this.id = id;
		this.tokenHash = tokenHash;
		this.tokenSalt = tokenSalt;
		this.userId = userId;
	}

	public static initialize({
		expirationDate,
		id,
		tokenHash,
		tokenSalt,
		userId,
	}: {
		expirationDate: Date;
		id: number;
		tokenHash: string;
		tokenSalt: string;
		userId: number;
	}): PasswordTokenEntity {
		return new PasswordTokenEntity({
			expirationDate,
			id,
			tokenHash,
			tokenSalt,
			userId,
		});
	}

	public static initializeNew({
		expirationDate,
		tokenHash,
		tokenSalt,
		userId,
	}: {
		expirationDate: Date;
		tokenHash: string;
		tokenSalt: string;
		userId: number;
	}): PasswordTokenEntity {
		return new PasswordTokenEntity({
			expirationDate,
			id: null,
			tokenHash,
			tokenSalt,
			userId,
		});
	}

	public getExpirationDate(): Date {
		return this.expirationDate;
	}

	public getToken(): { tokenHash: string; tokenSalt: string } {
		return { tokenHash: this.tokenHash, tokenSalt: this.tokenSalt };
	}

	public toNewObject(): {
		expirationDate: Date;
		tokenHash: string;
		tokenSalt: string;
		userId: number;
	} {
		return {
			expirationDate: this.expirationDate,
			tokenHash: this.tokenHash,
			tokenSalt: this.tokenSalt,
			userId: this.userId,
		};
	}

	public toObject(): {
		expirationDate: Date;
		id: number;
		userId: number;
	} {
		return {
			expirationDate: this.expirationDate,
			id: this.id as number,
			userId: this.userId,
		};
	}
}

export { PasswordTokenEntity };
