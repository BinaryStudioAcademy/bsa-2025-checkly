import { type Entity, type UserDto } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private avatarUrl: null | string;
	private dob: null | string;
	private email: string;
	private id: null | number;
	private name: string;
	private passwordHash: string;
	private passwordSalt: string;

	private constructor({
		avatarUrl = null,
		dob,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
		avatarUrl: null | string;
		dob: null | string;
		email: string;
		id: null | number;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}) {
		this.dob = dob;
		this.id = id;
		this.email = email;
		this.name = name;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.avatarUrl = avatarUrl;
	}

	public static initialize({
		avatarUrl,
		dob,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: UserDto & {
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl: avatarUrl ?? null,
			dob,
			email,
			id,
			name,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeNew(properties: {
		avatarUrl?: null | string;
		dob: null | string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl: properties.avatarUrl ?? null,
			dob: properties.dob,
			email: properties.email,
			id: null,
			name: properties.name,
			passwordHash: properties.passwordHash,
			passwordSalt: properties.passwordSalt,
		});
	}

	public getId(): number {
		return this.id as number;
	}

	public getPasswordData(): { passwordHash: string; passwordSalt: string } {
		return {
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toNewObject(): {
		avatarUrl: null | string;
		dob: null | string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			avatarUrl: this.avatarUrl,
			dob: this.dob,
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): UserDto {
		return {
			avatarUrl: this.avatarUrl,
			dob: this.dob,
			email: this.email,
			id: this.id as number,
			name: this.name,
		};
	}
}

export { UserEntity };
