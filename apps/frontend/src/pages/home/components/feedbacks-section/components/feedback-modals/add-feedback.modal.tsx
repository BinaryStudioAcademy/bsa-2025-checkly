import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import { Button, Input, Loader } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	feedbackApi,
	type FeedbackCreateRequestDto,
	feedbackCreateValidationSchema,
	FeedbackValidationRule,
} from "~/modules/feedbacks/feedbacks.js";

import styles from "./styles.module.css";

type Properties = {
	onClose: () => void;
	userId?: number;
};

const AddFeedbackModal: React.FC<Properties> = ({
	onClose,
	userId,
}: Properties) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { control, errors, handleSubmit, watch } =
		useAppForm<FeedbackCreateRequestDto>({
			defaultValues: { text: "", userId: Number(userId) },
			validationSchema: feedbackCreateValidationSchema,
		});

	const textValue = watch?.("text") ?? "";
	const characterCount = textValue.length;
	const maxCharacters = FeedbackValidationRule.TEXT_MAX_LENGTH;

	const handleFormSubmit = useCallback(
		async (payload: FeedbackCreateRequestDto): Promise<void> => {
			setIsLoading(true);

			try {
				await feedbackApi.create(payload);
				toast.success("Feedback was successfully added!");
				onClose();
			} catch {
				toast.error("Failed to add feedback. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		},
		[onClose],
	);

	const onSubmitHandler = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			void handleSubmit(handleFormSubmit)(event);
		},
		[handleSubmit, handleFormSubmit],
	);

	return (
		<form
			aria-labelledby="feedback-title"
			className={getClassNames(styles["form"], "cluster")}
			noValidate
			onSubmit={onSubmitHandler}
		>
			<h2 className={styles["feedback-title"]} id="feedback-title">
				Add your feedback
			</h2>
			<Input
				control={control}
				errors={errors}
				isRequired
				isTextArea
				label="Testimonial"
				name="text"
				placeholder="Enter your testimonial"
				type="text"
			/>
			<div className={styles["character-counter"]}>
				{characterCount}/{maxCharacters}
			</div>
			<Button
				isDisabled={isLoading}
				label="Add"
				loader={
					<Loader
						container="inline"
						isLoading={isLoading}
						size="small"
						theme="accent"
					/>
				}
				type="submit"
			/>
		</form>
	);
};

export { AddFeedbackModal };
