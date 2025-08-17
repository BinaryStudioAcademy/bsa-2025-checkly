import {
	Avatar01,
	Avatar02,
	Avatar03,
} from "~/assets/img/shared/avatars/avatars.img.js";
import {
	ExampleColourful,
	ExampleMinimal,
	ExampleWithRemarks,
} from "~/assets/img/shared/illustrations/layouts/layouts.img.js";

const FEEDBACKS = [
	{
		avatar: Avatar01,
		id: 1,
		name: "Roy",
		text: "Lorem ipsum dolor amet, consectetur adipiscing elit. Cras sed dui sagittis, scelerisque lectus at, porttitor lectus. Sed libero est, tincidunt eget purus nec, dignissim consequat mauris",
	},
	{
		avatar: Avatar02,
		id: 2,
		name: "Emma",
		text: "Nulla et nulla pulvinar, congue justo id, cursus ligula. Nunc pharetra sapien libero, vel blandit orci rhoncus ut. Sed aliquam efficitur semper.",
	},
	{
		avatar: Avatar03,
		id: 3,
		name: "Joan",
		text: "Nullam tempus, elit non tempus molestie, tellus diam sagittis urna, vel viverra velit risus in nunc. Cras in quam leo. Nullam mattis at lacus eget pretium. Etiam quis pulvinar",
	},
] as const;

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

export { FEEDBACKS, PAST_PLANS };
