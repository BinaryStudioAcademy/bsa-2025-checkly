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
		(option: number, checked: boolean): void => {
			const currentSelections = currentAnswer || [];
			const newSelections = toggleOption(option, currentSelections, checked);
			onAnswer(newSelections);
		},
		[currentAnswer, onAnswer],
	);

	const handleInputChange = useCallback(
		(optionId: number) =>
			(event_: React.ChangeEvent<HTMLInputElement>): void => {
				handleOptionChange(optionId, event_.target.checked);
			},
		[handleOptionChange],
	);

	return (
		<div className={styles["checkbox-question"]}>
			<div className={styles["options-container"]}>
				{question.options.map((option) => (
					<label className={styles["checkbox-option"]} key={option.id}>
						<input
							checked={isOptionSelected(option.id, currentAnswer)}
							className={styles["checkbox-input"]}
							onChange={handleInputChange(option.id)}
							type={ElementTypes.CHECKBOX}
						/>
						<div className={styles["checkbox-custom"]}>
							{isOptionSelected(option.id, currentAnswer) && (
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
