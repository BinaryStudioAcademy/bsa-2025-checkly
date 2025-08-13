import { ElementTypes, PlaceholderValues } from "~/libs/enums/enums.js";
import { sanitizeTextInput } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type TextQuestionProperties } from "~/libs/types/types.js";
import { getTextAnswerValue } from "~/pages/quiz/questions/libs/utilities.js";

import styles from "./styles.module.css";

const TextQuestion: React.FC<TextQuestionProperties> = ({
	currentAnswer,
	onAnswer,
	question,
}: TextQuestionProperties): React.ReactElement => {
	const handleChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>): void => {
			onAnswer(sanitizeTextInput(event_.target.value));
		},
		[onAnswer],
	);

	return (
		<div className={styles["text-question"]}>
			<label className={styles["label"]} htmlFor="text-answer">
				{question.text}
			</label>
			<input
				className={styles["text-input"]}
				id="text-answer"
				onChange={handleChange}
				placeholder={PlaceholderValues.ENTER_YOUR_ANSWER}
				type={ElementTypes.TEXT}
				value={getTextAnswerValue(currentAnswer)}
			/>
		</div>
	);
};

export { TextQuestion };
