import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

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
	type FeedbackDto,
	FeedbackValidationRule,
} from "~/modules/feedbacks/feedbacks.js";

import styles from "./styles.module.css";

type Properties = {
	existingFeedback?: FeedbackDto;
	onClose: () => void;
	onDeleteClick: (id: number) => void;
};

const AddFeedbackModal: React.FC<Properties> = ({
	existingFeedback,
	onClose,
	onDeleteClick,
}: Properties) => {
	const dispatch = useAppDispatch();
	const { dataStatus } = useAppSelector((state) => state.feedbacks);
	const isLoading = dataStatus === DataStatus.PENDING;

	const { control, errors, handleSubmit, reset, watch } =
		useAppForm<FeedbackCreateRequestDto>({
			defaultValues: {
				text: existingFeedback?.text ?? "",
			},
			validationSchema: feedbackCreateValidationSchema,
		});

	useEffect(() => {
		if (existingFeedback) {
			reset({ text: existingFeedback.text });
		}
	}, [existingFeedback, reset]);

	const textValue = watch?.("text") ?? "";
	const characterCount = textValue.length;
	const maxCharacters = FeedbackValidationRule.TEXT_MAX_LENGTH;

	const handleFormSubmit = useCallback(
		async (payload: FeedbackCreateRequestDto): Promise<void> => {
			if (existingFeedback && existingFeedback.text === payload.text) {
				onClose();
				toast.info("No changes were made.");

				return;
			}

			try {
				await dispatch(actions.createFeedback(payload)).unwrap();
				onClose();
			} catch {
				onClose();
			}
		},
		[dispatch, onClose, existingFeedback],
	);

	const handleOnSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			void handleSubmit(handleFormSubmit)(event);
		},
		[handleSubmit, handleFormSubmit],
	);

	const handleDeleteButtonClick = useCallback(() => {
		if (existingFeedback) {
			onDeleteClick(existingFeedback.id);
		}
	}, [onDeleteClick, existingFeedback]);

	return (
		<>
			<form
				aria-labelledby="feedback-title"
				className={getClassNames("cluster", styles["form"])}
				noValidate
				onSubmit={handleOnSubmit}
			>
				<Textarea
					control={control}
					errors={errors}
					fullSize
					name="text"
					placeholder="Enter your testimonial"
					resize="horizontal"
					rows={10}
				/>
				<div className={styles["character-counter"]}>
					{characterCount}/{maxCharacters}
				</div>
				<div
					className={getClassNames("cluster", styles["feedback-modal-buttons"])}
				>
					<Button
						isDisabled={isLoading}
						label={existingFeedback ? "Edit" : "Add"}
						loader={
							<Loader
								container="inline"
								isLoading={isLoading}
								size="small"
								theme="accent"
							/>
						}
						type="submit"
						variant="secondary"
					/>
					{existingFeedback && (
						<Button
							isDisabled={isLoading}
							label="Delete"
							loader={
								<Loader
									container="inline"
									isLoading={isLoading}
									size="small"
									theme="accent"
								/>
							}
							onClick={handleDeleteButtonClick}
							type="button"
							variant="secondary"
						/>
					)}
				</div>
			</form>
		</>
	);
};

export { AddFeedbackModal };
