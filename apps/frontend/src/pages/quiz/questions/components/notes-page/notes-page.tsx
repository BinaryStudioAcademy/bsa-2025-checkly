import React, { useCallback } from "react";

import { PlaceholderValues } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { sanitizeTextInput } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/quiz-questions/quiz-questions.js";

import styles from "./styles.module.css";

const NotesPage: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const { notes } = useAppSelector((state) => state.quizQuestion);

	const handleNotesChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
			dispatch(actions.setNotes(event.target.value));
		},
		[dispatch],
	);

	const handleNotesBlur = useCallback(
		(event: React.FocusEvent<HTMLTextAreaElement>): void => {
			dispatch(actions.setNotes(sanitizeTextInput(event.target.value)));
		},
		[dispatch],
	);

	return (
		<div className={getClassNames("grid-pattern", styles["notes-page"])}>
			<div className={getClassNames(styles["notes-content"], "flow-loose-lg")}>
				<div className="flow">
					<h2 className={styles["notes-title"]}>
						📝 Leave a special note for your plan
					</h2>
					<p className={styles["notes-description"]}>
						You can write here little motivational reminder for yourself or
						something that will inspire you in your achievements.
					</p>
				</div>

				<textarea
					className={styles["notes-textarea"]}
					onBlur={handleNotesBlur}
					onChange={handleNotesChange}
					placeholder={PlaceholderValues.WRITE_YOUR_NOTES_HERE}
					value={notes}
				/>
			</div>
		</div>
	);
};

export { NotesPage };
