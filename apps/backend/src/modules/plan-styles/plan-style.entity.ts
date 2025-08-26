import { type Entity } from "~/libs/types/types.js";

class PlanStyleEntity implements Entity {
	private id: null | number;

	private name: string;

	private constructor({ id, name }: { id: null | number; name: string }) {
		this.id = id;
		this.name = name;
	}

	public static initialize({
		id,
		name,
	}: {
		id: number;
		name: string;
	}): PlanStyleEntity {
		return new PlanStyleEntity({
			id,
			name,
		});
	}

	public static initializeNew({ name }: { name: string }): PlanStyleEntity {
		return new PlanStyleEntity({
			id: null,
			name,
		});
	}

	public toNewObject(): {
		name: string;
	} {
		return {
			name: this.name,
		};
	}

	public toObject(): {
		id: number;
		name: string;
	} {
		return {
			id: this.id as number,
			name: this.name,
		};
	}
}

export { PlanStyleEntity };
