import { useState } from "react";

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
	const [rawValue, setRawValue] = useState<string>(
		getTextAnswerValue(currentAnswer),
	);

	const handleChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>): void => {
			const newValue = event_.target.value;
			setRawValue(newValue);
			onAnswer(newValue);
		},
		[onAnswer],
	);

	const handleBlur = useCallback((): void => {
		const sanitizedValue = sanitizeTextInput(rawValue);
		setRawValue(sanitizedValue);
		onAnswer(sanitizedValue);
	}, [onAnswer, rawValue]);

	return (
		<div className={styles["text-question"]}>
			<label className={styles["label"]} htmlFor="text-answer">
				{question.text}
			</label>
			<input
				className={styles["text-input"]}
				id="text-answer"
				onBlur={handleBlur}
				onChange={handleChange}
				placeholder={PlaceholderValues.ENTER_YOUR_ANSWER}
				type={ElementTypes.TEXT}
				value={getTextAnswerValue(currentAnswer)}
			/>
		</div>
	);
};

export { TextQuestion };
