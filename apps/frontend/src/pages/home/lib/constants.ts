import {
	ExampleColourful,
	ExampleMinimal,
	ExampleWithRemarks,
} from "~/assets/img/shared/illustrations/layouts/layouts.img.js";

const LIMIT = 6;
const EMPTY_RESPONSE = 0;
const SINGLE_PAGE = 1;

const PAST_PLANS = [
	{
		id: 1,
		name: "Plan 1",
		path: ExampleColourful,
		planStyle: "colourful",
	},
	{
		id: 2,
		name: "Plan 2",
		path: ExampleMinimal,
		planStyle: "minimal",
	},
	{
		id: 3,
		name: "Plan 3",
		path: ExampleWithRemarks,
		planStyle: "withremarks",
	},
	{
		id: 4,
		name: "Plan 4",
		path: ExampleMinimal,
		planStyle: "minimal",
	},
	{
		id: 5,
		name: "Plan 5",
		path: ExampleWithRemarks,
		planStyle: "withremarks",
	},
	{
		id: 6,
		name: "Plan 6",
		path: ExampleColourful,
		planStyle: "colourful",
	},
	{
		id: 7,
		name: "Plan 7",
		path: ExampleWithRemarks,
		planStyle: "withremarks",
	},
	{
		id: 8,
		name: "Plan 8",
		path: ExampleColourful,
		planStyle: "colourful",
	},
] as const;

export { EMPTY_RESPONSE, LIMIT, PAST_PLANS, SINGLE_PAGE };
