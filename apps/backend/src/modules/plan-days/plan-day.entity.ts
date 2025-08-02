import { type Entity } from "~/libs/types/types.js";

class PlanDayEntity implements Entity {
	private dayNumber: number;

	private id: null | number;

	private planId: number;

	private constructor({
		dayNumber,
		id,
		planId,
	}: {
		dayNumber: number;
		id: null | number;
		planId: number;
	}) {
		this.id = id;
		this.dayNumber = dayNumber;
		this.planId = planId;
	}

	public static initialize({
		dayNumber,
		id,
		planId,
	}: {
		dayNumber: number;
		id: number;
		planId: number;
	}): PlanDayEntity {
		return new PlanDayEntity({
			dayNumber,
			id,
			planId,
		});
	}

	public static initializeNew({
		dayNumber,
		planId,
	}: {
		dayNumber: number;
		planId: number;
	}): PlanDayEntity {
		return new PlanDayEntity({
			dayNumber,
			id: null,
			planId,
		});
	}

	public toNewObject(): {
		dayNumber: number;
		planId: number;
	} {
		return {
			dayNumber: this.dayNumber,
			planId: this.planId,
		};
	}

	public toObject(): {
		dayNumber: number;
		id: number;
		planId: number;
	} {
		return {
			dayNumber: this.dayNumber,
			id: this.id as number,
			planId: this.planId,
		};
	}
}

export { PlanDayEntity };
