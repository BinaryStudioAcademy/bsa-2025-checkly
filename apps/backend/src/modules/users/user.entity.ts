import { type Entity, type UserDto } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private dob: null | string;

	private email: string;

	private id: null | number;

	private name: string;

	private passwordHash: string;

	private passwordSalt: string;

	private constructor({
		dob,
		email,
		id,
		name,
		passwordHash,
		passwordSalt,
	}: {
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
	}

	public static initialize({
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
			dob,
			email,
			id,
			name,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeNew({
		dob,
		email,
		name,
		passwordHash,
		passwordSalt,
	}: {
		dob: null | string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			dob,
			email,
			id: null,
			name,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeWithShortInfo({
		email,
		id,
		name,
	}: {
		email: string;
		id: number;
		name: string;
	}): UserEntity {
		return new UserEntity({
			dob: null,
			email,
			id,
			name,
			passwordHash: "",
			passwordSalt: "",
		});
	}

	public getPasswordData(): {
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toNewObject(): {
		dob: null | string;
		email: string;
		name: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			dob: this.dob,
			email: this.email,
			name: this.name,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): UserDto {
		return {
			dob: this.dob,
			email: this.email,
			id: this.id as number,
			name: this.name,
		};
	}
}

export { UserEntity };
