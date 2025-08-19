import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useStyleKey } from "~/libs/hooks/hooks.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
};

const NotesText = {
	HINT: "Use this space to reflect on any patterns, surprises, or small wins from the week. Honor your progress.",
	TEXT: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere reprehenderit dignissimos non cumque tenetur porro quod.",
	TITLE: "Notes:",
} as const;

const Notes: React.FC<Properties> = ({ inputStyle }: Properties) => {
	const { getStyleKey } = useStyleKey();
	const styleKey = getStyleKey(inputStyle);
	const notesClasses = getClassNames(
		styles["notes"],
		PlanStyleModules[styleKey]["notes"],
	);
	const notesTitleClasses = getClassNames(
		styles["notes-title"],
		PlanStyleModules[styleKey]["notes-title"],
	);
	const notesHintClasses = getClassNames(
		styles["notes-hint"],
		PlanStyleModules[styleKey]["notes-hint"],
	);
	const notesTextClasses = getClassNames(
		styles["notes-text"],
		PlanStyleModules[styleKey]["notes-text"],
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
