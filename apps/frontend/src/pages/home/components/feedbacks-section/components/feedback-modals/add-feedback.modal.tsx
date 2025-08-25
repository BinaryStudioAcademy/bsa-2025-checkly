import { useCallback } from "react";

import { Button, Loader, Textarea } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
} from "~/libs/hooks/hooks.js";
import {
	actions,
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
	const dispatch = useAppDispatch();
	const { dataStatus } = useAppSelector((state) => state.feedbacks);
	const isLoading = dataStatus === DataStatus.PENDING;

	const { control, errors, handleSubmit, reset, watch } =
		useAppForm<FeedbackCreateRequestDto>({
			defaultValues: { text: "", userId: Number(userId) },
			validationSchema: feedbackCreateValidationSchema,
		});

	const textValue = watch?.("text") ?? "";
	const characterCount = textValue.length;
	const maxCharacters = FeedbackValidationRule.TEXT_MAX_LENGTH;

	const handleFormSubmit = useCallback(
		async (payload: FeedbackCreateRequestDto): Promise<void> => {
			try {
				await dispatch(actions.createFeedback(payload)).unwrap();
				onClose();
				reset();
			} catch {
				onClose();
			}
		},
		[dispatch, onClose, reset],
	);

	const handleOnSubmit = useCallback(
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
			onSubmit={handleOnSubmit}
		>
			<h2 className={styles["feedback-title"]} id="feedback-title">
				Add your feedback
			</h2>
			<Textarea
				control={control}
				errors={errors}
				name="text"
				placeholder="Enter your testimonial"
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
