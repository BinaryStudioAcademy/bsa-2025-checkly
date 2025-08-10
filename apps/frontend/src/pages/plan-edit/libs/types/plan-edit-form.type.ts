type PlanActivity = {
	id: string;
	text: string;
};

type PlanDay = {
	activities: PlanActivity[];
	id: string;
	topic: string;
};

type PlanEditForm = {
	days: PlanDay[];
	notes: string;
};

export { type PlanEditForm };
