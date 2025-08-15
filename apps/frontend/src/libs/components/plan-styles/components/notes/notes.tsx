import { planStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
};

const notes = {
	HINT: "Use this space to reflect on any patterns, surprises, or small wins from the week. Honor your progress.",
	TEXT: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere reprehenderit dignissimos non cumque tenetur porro quod.",
	TITLE: "Notes:",
};

const Notes: React.FC<Properties> = ({ inputStyle }: Properties) => {
	const notesClasses = getClassNames(
		styles["notes"],
		planStyleModules[inputStyle]["notes"],
	);
	const notesTitleClasses = getClassNames(
		styles["notes-title"],
		planStyleModules[inputStyle]["notes-title"],
	);
	const notesHintClasses = getClassNames(
		styles["notes-hint"],
		planStyleModules[inputStyle]["notes-hint"],
	);
	const notesTextClasses = getClassNames(
		styles["notes-text"],
		planStyleModules[inputStyle]["notes-text"],
	);

	return (
		<li className={notesClasses}>
			<h2 className={notesTitleClasses}>{notes.TITLE}</h2>
			<p className={notesHintClasses}>{notes.HINT}</p>
			<p className={notesTextClasses}>&emsp;{notes.TEXT}</p>
		</li>
	);
};

export { Notes };
