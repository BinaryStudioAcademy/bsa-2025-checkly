import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type CheckboxQuestionProperties } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const CheckboxQuestion: React.FC<CheckboxQuestionProperties> = ({
	currentAnswer,
	onAnswer,
	question,
}: CheckboxQuestionProperties): React.ReactElement => {
	const handleOptionChange = useCallback(
		(option: string, checked: boolean): void => {
			const currentSelections = currentAnswer || [];

			if (checked) {
				if (!currentSelections.includes(option)) {
					onAnswer([...currentSelections, option]);
				}
			} else {
				onAnswer(currentSelections.filter((item) => item !== option));
			}
		},
		[currentAnswer, onAnswer],
	);

	const handleInputChange = useCallback(
		(optionText: string) => {
			return function (event_: React.ChangeEvent<HTMLInputElement>): void {
				handleOptionChange(optionText, event_.target.checked);
			};
		},
		[handleOptionChange],
	);

	return (
		<div className={styles["checkbox-question"]}>
			<div className={styles["options-container"]}>
				{question.options.map((option) => (
					<label className={styles["checkbox-option"]} key={option.text}>
						<input
							checked={currentAnswer?.includes(option.text) || false}
							className={styles["checkbox-input"]}
							onChange={handleInputChange(option.text)}
							type="checkbox"
						/>
						<div className={styles["checkbox-custom"]}>
							{currentAnswer?.includes(option.text) && (
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
