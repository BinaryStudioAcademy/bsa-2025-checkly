import { useState } from "react";

import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { ElementTypes, PlaceholderValues } from "~/libs/enums/enums.js";
import { getClassNames, sanitizeTextInput } from "~/libs/helpers/helpers.js";
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
	const OTHER_OPTION_TITLE = "✍️ Other";
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
			const selected = question.options.find((o) => o.text === option);
			const optionValue = isOtherOption(option)
				? OTHER_OPTION_TITLE
				: (selected?.id.toString() ?? option);

			if (isSwitchingFromOther) {
				setUserInput("");
			}

			setSelectedOption(optionValue);
			onAnswer({
				selectedOption: optionValue,
				userInput: newUserInput,
			});
		},
		[onAnswer, question, shouldClearUserInput, userInput],
	);

	const handleTextChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>): void => {
			const newUserInput = event_.target.value;
			setUserInput(newUserInput);
			onAnswer({
				selectedOption: optionId?.toString() ?? selectedOption,
				userInput: newUserInput,
			});
		},
		[onAnswer, optionId, selectedOption],
	);

	const handleTextBlur = useCallback((): void => {
		const sanitizedValue = sanitizeTextInput(userInput);
		setUserInput(sanitizedValue);
		onAnswer({ selectedOption, userInput: sanitizedValue });
	}, [onAnswer, selectedOption, userInput]);

	const handleOptionChange = useCallback(
		(optionText: string) => (): void => {
			handleOptionSelect(optionText);
		},
		[handleOptionSelect],
	);

	return (
		<div
			className={`${styles["single-choice-with-text-question"] ?? ""} ${isOtherSelected ? (styles["has-text-input"] ?? "") : ""}`}
		>
			<div className={styles["radio-section"]}>
				<div className={styles["options-container"]}>
					{question.options.map((option) => (
						<label className={styles["radio-option"]} key={option.id}>
							<input
								checked={
									selectedOption === option.id.toString() ||
									selectedOption === option.text
								}
								className={styles["radio-input"]}
								name="single-choice-option"
								onChange={handleOptionChange(option.text)}
								type={ElementTypes.RADIO}
								value={option.id.toString()}
							/>
							<div className={styles["radio-custom"]}>
								{(selectedOption === option.id.toString() ||
									selectedOption === option.text) && (
									<img alt="Selected" src={logoIcon} />
								)}
							</div>
							<span className={styles["option-text"]}>{option.text}</span>
						</label>
					))}
				</div>
			</div>

			{isOtherSelected && (
				<div className={getClassNames("flow", styles["text-input-wrapper"])}>
					<label
						className={styles["label"]}
						htmlFor="single-choice-text-answer"
					>
						What other option would you like to add?
					</label>
					<input
						className={styles["text-input"]}
						id="single-choice-text-answer"
						onBlur={handleTextBlur}
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
