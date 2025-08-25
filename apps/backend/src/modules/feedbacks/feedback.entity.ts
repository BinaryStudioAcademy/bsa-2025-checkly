import { type Entity } from "~/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";

import { type UserDto } from "./libs/types/types.js";

type UserProfileResponseDto = null | UserDto;

class FeedbackEntity implements Entity {
	private createdAt: string;
	private id: null | number;
	private text: string;
	private updatedAt: string;
	private user: null | UserEntity;
	private userId: number;

	private constructor({
		createdAt,
		id,
		text,
		updatedAt,
		user = null,
		userId,
	}: {
		createdAt: string;
		id: null | number;
		text: string;
		updatedAt: string;
		user?: null | UserEntity;
		userId: number;
	}) {
		this.id = id;
		this.text = text;
		this.userId = userId;
		this.user = user;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public static initialize({
		createdAt,
		id,
		text,
		updatedAt,
		user,
		userId,
	}: {
		createdAt: string;
		id: number;
		text: string;
		updatedAt: string;
		user?: null | {
			avatarUrl: null | string;
			email: string;
			id: number;
			name: string;
		};
		userId: number;
	}): FeedbackEntity {
		const userInstance = user ? UserEntity.initializeWithShortInfo(user) : null;

		return new FeedbackEntity({
			createdAt,
			id,
			text,
			updatedAt,
			user: userInstance,
			userId,
		});
	}

	public static initializeNew({
		text,
		userId,
	}: {
		text: string;
		userId: number;
	}): FeedbackEntity {
		return new FeedbackEntity({
			createdAt: "",
			id: null,
			text,
			updatedAt: "",
			user: null,
			userId,
		});
	}

	public toNewObject(): {
		text: string;
		userId: number;
	} {
		return {
			text: this.text,
			userId: this.userId,
		};
	}

	public toObject(): {
		createdAt: string;
		id: null | number;
		text: string;
		updatedAt: string;
		userId: number;
	} {
		return {
			createdAt: this.createdAt,
			id: this.id,
			text: this.text,
			updatedAt: this.updatedAt,
			userId: this.userId,
		};
	}

	public toObjectWithRelations(): {
		createdAt: string;
		id: number;
		text: string;
		updatedAt: string;
		user: UserProfileResponseDto;
		userId: number;
	} {
		if (!this.id) {
			throw new Error("Cannot serialize a new object.");
		}

		const user = this.user ? this.user.toObject() : null;

		return {
			createdAt: this.createdAt,
			id: this.id,
			text: this.text,
			updatedAt: this.updatedAt,
			user,
			userId: this.userId,
		};
	}
}

export { FeedbackEntity };
