import {
	Croissant,
	Dog,
	Headphones,
	IceCream,
	Phone,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import {
	StarsYellow01,
	StarsYellow02,
	StarsYellow03,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { QUIZ_CONSTANTS } from "~/libs/enums/enums.js";

type IconPosition = {
	icon: string;
	position: "bottom-left" | "bottom-right" | "top-left" | "top-right";
};

const QUESTION_ICON_SETS = [
	[
		{ icon: Headphones, position: "top-right" as const },
		{ icon: Dog, position: "bottom-right" as const },
		{ icon: IceCream, position: "bottom-left" as const },
	],
	[
		{ icon: Phone, position: "top-right" as const },
		{ icon: Croissant, position: "bottom-left" as const },
		{ icon: StarsYellow01, position: "top-left" as const },
	],
	[
		{ icon: StarsYellow02, position: "top-right" as const },
		{ icon: StarsYellow03, position: "bottom-right" as const },
		{ icon: StarsYellow01, position: "bottom-left" as const },
	],
	[
		{ icon: Headphones, position: "top-right" as const },
		{ icon: Dog, position: "bottom-right" as const },
		{ icon: IceCream, position: "bottom-left" as const },
	],
] as const;

const getQuestionIcons = (questionNumber: number): IconPosition[] => {
	const setIndex =
		(questionNumber - QUIZ_CONSTANTS.FIRST_QUESTION) %
		QUESTION_ICON_SETS.length;
	const iconSet = QUESTION_ICON_SETS[setIndex];

	if (!iconSet) {
		const fallbackSet = QUESTION_ICON_SETS[QUIZ_CONSTANTS.FIRST_ANSWER_INDEX];

		return [...fallbackSet];
	}

	return [...iconSet];
};

export { getQuestionIcons };
