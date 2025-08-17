type DayTopic = {
	main: string;
	weekday: string;
};

type PlanActivity = {
	id: string;
	text: string;
};

type PlanDaily = {
	activities: PlanActivity[];
	id: string;
	topic: string;
};

export { type DayTopic, type PlanDaily };
