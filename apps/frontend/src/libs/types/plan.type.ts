type DayTopic = {
	main: string;
	weekday: string;
};

type PlanActivity = {
	id: string;
	text: string;
};

type PlanDay = {
	activities: PlanActivity[];
	id: string;
	topic: string;
};

export { type DayTopic, type PlanActivity, type PlanDay };
