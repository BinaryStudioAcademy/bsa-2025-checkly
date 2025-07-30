import { type Entity } from "~/libs/types/types.js";

class PlanDayEntity implements Entity {
	private dayNumber: number;

	private id: null | number;

	private isRegenerated: boolean;

	private planId: number;

	private constructor({
		dayNumber,
		id,
		isRegenerated,
		planId,
	}: {
		dayNumber: number;
		id: null | number;
		isRegenerated: boolean;
		planId: number;
	}) {
		this.id = id;
		this.dayNumber = dayNumber;
		this.isRegenerated = isRegenerated;
		this.planId = planId;
	}

	public static initialize({
		dayNumber,
		id,
		isRegenerated,
		planId,
	}: {
		dayNumber: number;
		id: number;
		isRegenerated: boolean;
		planId: number;
	}): PlanDayEntity {
		return new PlanDayEntity({
			dayNumber,
			id,
			isRegenerated,
			planId,
		});
	}

	public static initializeNew({
		dayNumber,
		isRegenerated = false,
		planId,
	}: {
		dayNumber: number;
		isRegenerated?: boolean;
		planId: number;
	}): PlanDayEntity {
		return new PlanDayEntity({
			dayNumber,
			id: null,
			isRegenerated,
			planId,
		});
	}

	public toNewObject(): {
		dayNumber: number;
		isRegenerated: boolean;
		planId: number;
	} {
		return {
			dayNumber: this.dayNumber,
			isRegenerated: this.isRegenerated,
			planId: this.planId,
		};
	}

	public toObject(): {
		dayNumber: number;
		id: number;
		isRegenerated: boolean;
		planId: number;
	} {
		return {
			dayNumber: this.dayNumber,
			id: this.id as number,
			isRegenerated: this.isRegenerated,
			planId: this.planId,
		};
	}
}

export { PlanDayEntity };
