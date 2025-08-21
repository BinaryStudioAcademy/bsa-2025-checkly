import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
};

const NotesText = {
	HINT: "Use this space to reflect on any patterns, surprises, or small wins from the week. Honor your progress.",
	TEXT: "Morning workouts gave me energy. Healthy meals were easier to prepare. I enjoyed meditation and felt good about my progress. Taking time to reflect helped me notice small improvements each day.",
	TITLE: "Notes:",
} as const;

const Notes: React.FC<Properties> = ({ inputStyle }: Properties) => {
	const notesClasses = getClassNames(
		styles["notes"],
		PlanStyleModules[inputStyle]["notes"],
	);
	const notesTitleClasses = getClassNames(
		styles["notes-title"],
		PlanStyleModules[inputStyle]["notes-title"],
	);
	const notesHintClasses = getClassNames(
		styles["notes-hint"],
		PlanStyleModules[inputStyle]["notes-hint"],
	);
	const notesTextClasses = getClassNames(
		styles["notes-text"],
		PlanStyleModules[inputStyle]["notes-text"],
	);

	return (
		<li className={notesClasses}>
			<h2 className={notesTitleClasses}>{NotesText.TITLE}</h2>
			<p className={notesHintClasses}>{NotesText.HINT}</p>
			<p className={notesTextClasses}>&emsp;{NotesText.TEXT}</p>
		</li>
	);
};

export { Notes };
