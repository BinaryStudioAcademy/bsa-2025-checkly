import {
	Avatar01,
	Avatar02,
	Avatar03,
} from "~/assets/img/shared/avatars/avatars.img.js";

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

export { FEEDBACKS };
