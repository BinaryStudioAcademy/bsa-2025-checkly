import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
    notes?: string;
};

const NotesText = {
	HINT: "Use this space to reflect on any patterns, surprises, or small wins from the week. Honor your progress.",
	TITLE: "Notes:",
} as const;

const Notes: React.FC<Properties> = ({
	inputStyle,
	notes,
}: Properties) => {
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
			{notes ? (
				<p className={notesTextClasses}>&emsp;{notes}</p>
			) : (
				<p className={notesHintClasses}>{NotesText.HINT}</p>
			)}
		</li>
	);
};

export { Notes };
