import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private avatarUrl: null | string;
	private email: string;
	private id: null | number;
	private name: string;
	private passwordHash: string;
	private passwordSalt: string;

	private constructor({
		avatarUrl = null,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		avatarUrl: null | string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.avatarUrl = avatarUrl;
	}

	public static initialize(properties: {
		avatarUrl?: null | string;
		email: string;
		id: number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl: properties.avatarUrl ?? null,
			email: properties.email,
			id: properties.id,
			name: properties.name,
			passwordHash: properties.passwordHash,
			passwordSalt: properties.passwordSalt,
		});
	}

	public static initializeNew(properties: {
		avatarUrl?: null | string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl: properties.avatarUrl ?? null,
			email: properties.email,
			id: null,
			name: properties.name,
			passwordHash: properties.passwordHash,
			passwordSalt: properties.passwordSalt,
		});
	}

	public getPasswordData(): { passwordHash: string; passwordSalt: string } {
		return {
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toNewObject(): {
		avatarUrl: null | string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			avatarUrl: this.avatarUrl,
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): {
		avatarUrl: null | string;
		email: string;
		id: number;
		name: string;
	} {
		return {
			avatarUrl: this.avatarUrl,
			email: this.email,
			id: this.id as number,
			name: this.name,
		};
	}
}

export { UserEntity };
