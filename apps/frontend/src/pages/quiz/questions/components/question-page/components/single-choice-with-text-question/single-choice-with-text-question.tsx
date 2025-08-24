import { useState } from "react";

import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { ElementTypes, PlaceholderValues } from "~/libs/enums/enums.js";
import { sanitizeTextInput } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type SingleChoiceWithTextQuestionProperties } from "~/libs/types/types.js";
import { isOtherOption } from "~/pages/quiz/questions/libs/utilities.js";

import styles from "./styles.module.css";

const SingleChoiceWithTextQuestion: React.FC<
	SingleChoiceWithTextQuestionProperties
> = ({
	currentAnswer,
	onAnswer,
	question,
}: SingleChoiceWithTextQuestionProperties): React.ReactElement => {
	const [selectedOption, setSelectedOption] = useState<null | string>(
		currentAnswer?.selectedOption ?? null,
	);
	const [userInput, setUserInput] = useState<string>(
		currentAnswer?.userInput ?? "",
	);

	const isOtherSelected = selectedOption && isOtherOption(selectedOption);
	const shouldClearUserInput = selectedOption && isOtherOption(selectedOption);
	const optionId = question.options.find((o) => o.text === selectedOption)?.id;

	const handleOptionSelect = useCallback(
		(option: string): void => {
			const isSwitchingFromOther =
				shouldClearUserInput && !isOtherOption(option);
			const newUserInput = isSwitchingFromOther ? "" : userInput;

			if (isSwitchingFromOther) {
				setUserInput("");
			}

			setSelectedOption(option);
			onAnswer({
				selectedOption: optionId?.toString() ?? option,
				userInput: newUserInput,
			});
		},
		[onAnswer, optionId, shouldClearUserInput, userInput],
	);

	const handleTextChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>): void => {
			const newUserInput = sanitizeTextInput(event_.target.value);
			setUserInput(newUserInput);
			onAnswer({
				selectedOption: optionId?.toString() ?? selectedOption,
				userInput: newUserInput,
			});
		},
		[onAnswer, optionId, selectedOption],
	);

	const handleOptionChange = useCallback(
		(optionText: string) => (): void => {
			handleOptionSelect(optionText);
		},
		[handleOptionSelect],
	);

	return (
		<div className={styles["single-choice-with-text-question"]}>
			<div className={styles["radio-section"]}>
				<div className={styles["options-container"]}>
					{question.options.map((option) => (
						<label className={styles["radio-option"]} key={option.text}>
							<input
								checked={selectedOption === option.text}
								className={styles["radio-input"]}
								name="single-choice-option"
								onChange={handleOptionChange(option.text)}
								type={ElementTypes.RADIO}
								value={option.text}
							/>
							<div className={styles["radio-custom"]}>
								{selectedOption === option.text && (
									<img alt="Selected" src={logoIcon} />
								)}
							</div>
							<span className={styles["option-text"]}>{option.text}</span>
						</label>
					))}
				</div>
			</div>

			{isOtherSelected && (
				<div className={styles["text-section"]}>
					<label
						className={styles["label"]}
						htmlFor="single-choice-text-answer"
					>
						What other option would you like to add?
					</label>
					<input
						className={styles["text-input"]}
						id="single-choice-text-answer"
						onChange={handleTextChange}
						placeholder={PlaceholderValues.ENTER_YOUR_ADDITIONAL_OPTIONS}
						type={ElementTypes.TEXT}
						value={userInput}
					/>
				</div>
			)}
		</div>
	);
};

export { SingleChoiceWithTextQuestion };
