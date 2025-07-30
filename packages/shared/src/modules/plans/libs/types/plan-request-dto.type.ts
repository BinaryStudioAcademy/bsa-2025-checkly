type PlanRequestDto = {
	duration: string;
	intensity: string;
	isActive?: boolean;
	parentPlanId?: null | number;
	title: string;
	userId: number;
};

export { type PlanRequestDto };
