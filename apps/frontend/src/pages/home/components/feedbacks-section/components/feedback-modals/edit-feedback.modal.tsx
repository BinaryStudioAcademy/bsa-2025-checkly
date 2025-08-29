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
	type FeedbackUpdateRequestDto,
	feedbackUpdateValidationSchema,
} from "~/modules/feedbacks/feedbacks.js";

import { FeedbackLoaderContainer } from "../../feedback-loader-container/feedback-loader-container.js";
import styles from "./styles.module.css";

type Properties = {
	id: number;
	onClose: () => void;
};

const EditFeedbackModal: React.FC<Properties> = ({
	id,
	onClose,
}: Properties) => {
	const dispatch = useAppDispatch();
	const { dataStatus, feedbacks } = useAppSelector((state) => state.feedbacks);

	const feedbackToEdit = feedbacks.find((feedback) => feedback.id === id);
	const isUpdating = dataStatus === DataStatus.PENDING;

	const { control, errors, handleSubmit, reset } =
		useAppForm<FeedbackUpdateRequestDto>({
			defaultValues: {
				text: feedbackToEdit?.text ?? "",
			},
			validationSchema: feedbackUpdateValidationSchema,
		});

	useEffect(() => {
		if (!feedbackToEdit) {
			void dispatch(actions.fetchFeedbackById(id));
		}
	}, [dispatch, id, feedbackToEdit]);

	useEffect(() => {
		if (feedbackToEdit && dataStatus !== DataStatus.PENDING) {
			reset({
				text: feedbackToEdit.text,
			});
		}
	}, [dataStatus, feedbackToEdit, reset]);

	const handleUpdateSubmit = useCallback(
		(payload: FeedbackUpdateRequestDto): void => {
			const isTextUnchanged = feedbackToEdit?.text === payload.text;

			if (isTextUnchanged) {
				onClose();
				toast.info("No changes were made.");

				return;
			}

			void dispatch(actions.updateFeedback({ id, payload }));
		},
		[dispatch, id, feedbackToEdit, onClose],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(handleUpdateSubmit)(event_);
		},
		[handleSubmit, handleUpdateSubmit],
	);

	useEffect(() => {
		if (dataStatus === DataStatus.FULFILLED && feedbackToEdit) {
			onClose();
		}
	}, [dataStatus, onClose, feedbackToEdit]);

	if (!feedbackToEdit || dataStatus === DataStatus.PENDING) {
		return <FeedbackLoaderContainer />;
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
			<Textarea
				control={control}
				errors={errors}
				name="text"
				placeholder="Enter a new testimonial"
			/>
			<Button
				isDisabled={isUpdating}
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
