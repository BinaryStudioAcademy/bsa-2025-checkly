type ActivitiesMockData = {
	days: Day[];
	notes: string;
};

type Activity = {
	id: string;
	text: string;
};

type Day = {
	activities: Activity[];
	id: string;
};

export { type ActivitiesMockData, type Activity, type Day };
