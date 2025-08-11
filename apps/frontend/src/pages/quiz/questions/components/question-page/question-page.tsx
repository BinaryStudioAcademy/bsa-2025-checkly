import { DecorativeImage } from "~/libs/components/decorative-image/decorative-image.js";
import { QuizIndexes, QuizQuestionFormat } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { getQuestionIcons } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import {
	type MultipleAnswers,
	type QuestionPageProperties,
	type SingleAnswer,
} from "~/libs/types/types.js";

import { CheckboxQuestion } from "./components/checkbox-question/checkbox-question.js";
import { MixedQuestion } from "./components/mixed-question/mixed-question.js";
import { RadioQuestion } from "./components/radio-question/radio-question.js";
import { TextQuestion } from "./components/text-question/text-question.js";
import styles from "./styles.module.css";

const QuestionPage: React.FC<QuestionPageProperties> = ({
	currentAnswer,
	onAnswer,
	question,
	questionNumber,
}: QuestionPageProperties): React.ReactElement => {
	const handleCheckboxAnswer = useCallback(
		(selectedOptions: MultipleAnswers[]): void => {
			onAnswer({
				isSkipped: false,
				questionId: question.id,
				questionText: question.text,
				selectedOptions,
				userInput: "",
			});
		},
		[onAnswer, question],
	);

	const handleRadioAnswer = useCallback(
		(selectedOption: SingleAnswer): void => {
			onAnswer({
				isSkipped: false,
				questionId: question.id,
				questionText: question.text,
				selectedOptions: [selectedOption],
				userInput: "",
			});
		},
		[onAnswer, question],
	);

	const handleTextAnswer = useCallback(
		(userInput: string): void => {
			onAnswer({
				isSkipped: false,
				questionId: question.id,
				questionText: question.text,
				selectedOptions: [],
				userInput,
			});
		},
		[onAnswer, question],
	);

	const handleMixedAnswer = useCallback(
		(answer: {
			selectedOptions: MultipleAnswers[];
			userInput: string;
		}): void => {
			onAnswer({
				isSkipped: false,
				questionId: question.id,
				questionText: question.text,
				selectedOptions: answer.selectedOptions,
				userInput: answer.userInput,
			});
		},
		[onAnswer, question],
	);

	function renderQuestion(): React.ReactElement {
		switch (question.type) {
			case QuizQuestionFormat.MULTIPLE_CHOICE: {
				return (
					<CheckboxQuestion
						currentAnswer={currentAnswer ? currentAnswer.selectedOptions : []}
						onAnswer={handleCheckboxAnswer}
						question={question}
					/>
				);
			}

			case QuizQuestionFormat.MULTIPLE_CHOICE_WITH_TEXT_INPUT: {
				return (
					<MixedQuestion
						currentAnswer={
							currentAnswer
								? {
										selectedOptions: currentAnswer.selectedOptions,
										userInput: currentAnswer.userInput,
									}
								: {
										selectedOptions: [],
										userInput: "",
									}
						}
						onAnswer={handleMixedAnswer}
						question={question}
					/>
				);
			}

			case QuizQuestionFormat.SINGLE_CHOICE: {
				return (
					<RadioQuestion
						currentAnswer={
							currentAnswer?.selectedOptions[QuizIndexes.ZERO_INDEX] || ""
						}
						onAnswer={handleRadioAnswer}
						question={question}
					/>
				);
			}

			case QuizQuestionFormat.TEXT_INPUT: {
				return (
					<TextQuestion
						currentAnswer={currentAnswer ? currentAnswer.userInput : ""}
						onAnswer={handleTextAnswer}
						question={question}
					/>
				);
			}

			default: {
				return (
					<div className={styles["error"]}>
						<h2>Unsupported question type</h2>
						<p>This question type is not yet supported.</p>
					</div>
				);
			}
		}
	}

	return (
		<div className={styles["question-page"]}>
			{questionNumber && (
				<div
					className={getClassNames(styles["question-icons"], "show-tablet-up")}
				>
					{getQuestionIcons(questionNumber).map((iconData, index) => {
						const questionIconClass = styles["question-icon"] ?? "";
						const positionClass = styles[`icon-${iconData.position}`] ?? "";
						const className = `${questionIconClass} ${positionClass}`;

						return (
							<DecorativeImage
								className={className}
								key={index}
								src={iconData.icon}
							/>
						);
					})}
				</div>
			)}

			<div className={styles["question-content"]}>
				<div className={styles["question-header"]}>
					{questionNumber && (
						<div className={styles["question-number"]}>
							Question #{questionNumber}
						</div>
					)}
					<h1 className={styles["question-title"]}>{question.text}</h1>
				</div>

				{renderQuestion()}
			</div>
		</div>
	);
};

export { QuestionPage };
