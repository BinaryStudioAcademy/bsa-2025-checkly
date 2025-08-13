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
import { IconsPositions, QuizIndexes } from "~/libs/enums/enums.js";

type Icon = {
	icon: string;
	position: IconPosition;
};

type IconPosition = (typeof IconsPositions)[keyof typeof IconsPositions];

const QUESTION_ICON_SETS = [
	[
		{ icon: Headphones, position: IconsPositions.TOP_RIGHT },
		{ icon: Dog, position: IconsPositions.BOTTOM_RIGHT },
		{ icon: IceCream, position: IconsPositions.BOTTOM_LEFT },
	],
	[
		{ icon: Phone, position: IconsPositions.TOP_RIGHT },
		{ icon: Croissant, position: IconsPositions.BOTTOM_LEFT },
		{ icon: StarsYellow01, position: IconsPositions.TOP_LEFT },
	],
	[
		{ icon: StarsYellow02, position: IconsPositions.TOP_RIGHT },
		{ icon: StarsYellow03, position: IconsPositions.BOTTOM_RIGHT },
		{ icon: StarsYellow01, position: IconsPositions.BOTTOM_LEFT },
	],
	[
		{ icon: Headphones, position: IconsPositions.TOP_RIGHT },
		{ icon: Dog, position: IconsPositions.BOTTOM_RIGHT },
		{ icon: IceCream, position: IconsPositions.BOTTOM_LEFT },
	],
] as const;

const getQuestionIcons = (questionNumber: number): Icon[] => {
	const setIndex =
		(questionNumber - QuizIndexes.FIRST_INDEX) % QUESTION_ICON_SETS.length;
	const iconSet = QUESTION_ICON_SETS[setIndex];

	if (!iconSet) {
		const fallbackSet = QUESTION_ICON_SETS[QuizIndexes.FIRST_INDEX];

		return [...fallbackSet];
	}

	return [...iconSet];
};

export { getQuestionIcons };
