import React, { useCallback } from "react";

import { PlaceholderValues } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { sanitizeTextInput } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/quiz/quiz.js";

import styles from "./styles.module.css";

const NotesPage: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const { notes } = useAppSelector((state) => state.quiz);

	const handleNotesChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
			dispatch(actions.setNotes(sanitizeTextInput(event.target.value)));
		},
		[dispatch],
	);

	return (
		<div className={styles["notes-page"]}>
			<div className={getClassNames(styles["notes-content"], "grid-pattern")}>
				<h2 className={styles["notes-title"]}>
					Want to add any personal notes for your plan?
				</h2>
				<p className={styles["notes-description"]}>
					Feel free to add any additional thoughts, comments, or notes about
					your experience with this quiz.
				</p>

				<textarea
					className={styles["notes-textarea"]}
					onChange={handleNotesChange}
					placeholder={PlaceholderValues.WRITE_YOUR_NOTES_HERE}
					value={notes}
				/>
			</div>
		</div>
	);
};

export { NotesPage };
