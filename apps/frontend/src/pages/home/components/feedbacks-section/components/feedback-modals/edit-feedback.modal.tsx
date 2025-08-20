import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Input, Loader } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	feedbackApi,
	type FeedbackUpdateRequestDto,
	feedbackUpdateValidationSchema,
} from "~/modules/feedbacks/feedbacks.js";

import styles from "./styles.module.css";

type Properties = {
	id: number;
	onClose: () => void;
	userId: number | undefined;
};

const EditFeedbackModal: React.FC<Properties> = ({
	id,
	onClose,
	userId,
}: Properties) => {
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const { control, errors, handleSubmit, reset } =
		useAppForm<FeedbackUpdateRequestDto>({
			defaultValues: { text: "", userId: Number(userId) },
			validationSchema: feedbackUpdateValidationSchema,
		});

	useEffect(() => {
		const fetchFeedback = async (): Promise<void> => {
			setIsFetching(true);
			const fetchedFeedback = await feedbackApi.findById(id);

			if (fetchedFeedback) {
				reset({
					text: fetchedFeedback.text,
					userId: fetchedFeedback.userId,
				});
			}

			setIsFetching(false);
		};

		void fetchFeedback();
	}, [id, reset]);

	const handleUpdateSubmit = useCallback(
		async (payload: FeedbackUpdateRequestDto): Promise<void> => {
			setIsUpdating(true);

			try {
				await feedbackApi.update(id, payload);
				toast.success("Feedback was successfully updated!");
				onClose();
			} catch {
				toast.error("Failed to update feedback. Please try again later.");
			} finally {
				setIsUpdating(false);
			}
		},
		[id, onClose],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((data) => {
				void handleUpdateSubmit(data);
			})(event_);
		},
		[handleSubmit, handleUpdateSubmit],
	);

	if (isFetching) {
		return (
			<div className={styles["loader-container"]}>
				<Loader container="inline" size="large" />
			</div>
		);
	}

	return (
		<form
			aria-labelledby="feedback-title"
			className={getClassNames(styles["form"], "cluster")}
			noValidate
			onSubmit={handleFormSubmit}
		>
			<h2 className={styles["feedback-title"]} id="feedback-title">
				Edit your feedback
			</h2>
			<Input
				control={control}
				errors={errors}
				isRequired
				label="Testimonial"
				name="text"
				placeholder="Enter a testimonial"
				type="text"
			/>
			<Button
				isDisabled={isUpdating || isFetching}
				label="Save Changes"
				loader={
					<Loader
						container="inline"
						isLoading={isUpdating}
						size="small"
						theme="accent"
					/>
				}
				type="submit"
			/>
		</form>
	);
};

export { EditFeedbackModal };
