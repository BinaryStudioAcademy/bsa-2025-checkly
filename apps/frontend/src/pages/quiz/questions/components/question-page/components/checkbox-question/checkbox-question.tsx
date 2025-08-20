import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { ElementTypes } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CheckboxQuestionProperties } from "~/libs/types/types.js";
import {
	isOptionSelected,
	toggleOption,
} from "~/pages/quiz/questions/libs/utilities.js";

import styles from "./styles.module.css";

const CheckboxQuestion: React.FC<CheckboxQuestionProperties> = ({
	currentAnswer,
	onAnswer,
	question,
}: CheckboxQuestionProperties): React.ReactElement => {
	const handleOptionChange = useCallback(
		(option: string, isChecked: boolean): void => {
			const currentSelections = currentAnswer ?? [];
			const newSelections = toggleOption(option, currentSelections, isChecked);
			onAnswer(newSelections);
		},
		[currentAnswer, onAnswer],
	);

	const handleInputChange = useCallback(
		(optionText: string) =>
			(event_: React.ChangeEvent<HTMLInputElement>): void => {
				handleOptionChange(optionText, event_.target.checked);
			},
		[handleOptionChange],
	);

	return (
		<div className={styles["checkbox-question"]}>
			<div className={styles["options-container"]}>
				{question.options.map((option) => (
					<label className={styles["checkbox-option"]} key={option.text}>
						<input
							checked={isOptionSelected(option.text, currentAnswer)}
							className={styles["checkbox-input"]}
							onChange={handleInputChange(option.text)}
							type={ElementTypes.CHECKBOX}
						/>
						<div className={styles["checkbox-custom"]}>
							{isOptionSelected(option.text, currentAnswer) && (
								<img alt="Selected" src={logoIcon} />
							)}
						</div>
						<span className={styles["option-text"]}>{option.text}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export { CheckboxQuestion };
