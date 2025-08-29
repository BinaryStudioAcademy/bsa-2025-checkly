import { type FC, useCallback, useEffect } from "react";

import { Button, Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/feedbacks/feedbacks.js";

import { FeedbackLoaderContainer } from "../../../../../pages/home/components/feedbacks-section/feedback-loader-container/feedback-loader-container.js";
import styles from "./styles.module.css";

type Properties = {
	handleCancelClick: () => void;
	id: number;
	onClose: () => void;
};

const DeleteFeedbackModal: FC<Properties> = ({
	handleCancelClick,
	id,
	onClose,
}) => {
	const dispatch = useAppDispatch();
	const { dataStatus, feedbacks } = useAppSelector((state) => state.feedbacks);

	const feedbackToDelete = feedbacks.find((feedback) => feedback.id === id);
	const isDeleting = dataStatus === DataStatus.PENDING;

	useEffect(() => {
		if (!feedbackToDelete) {
			void dispatch(actions.fetchFeedbackById(id));
		}
	}, [dispatch, id, feedbackToDelete]);

	const handleDeleteClick = useCallback(async () => {
		const result = await dispatch(actions.deleteFeedback(id)).unwrap();

		if (result) {
			onClose();
		}
	}, [dispatch, id, onClose]);

	const handleDeleteButtonClick = useCallback(() => {
		void handleDeleteClick();
	}, [handleDeleteClick]);

	if (!feedbackToDelete || isDeleting) {
		return <FeedbackLoaderContainer />;
	}

	return (
		<div
			aria-labelledby="feedback-title"
			className={getClassNames(styles["delete-modal"], "cluster")}
		>
			<p className={styles["feedback-text"]}>{feedbackToDelete.text}</p>
			<div
				className={getClassNames("cluster", styles["feedback-modal-buttons"])}
			>
				<Button
					isDisabled={isDeleting}
					label="Delete"
					loader={
						<Loader
							container="inline"
							isLoading={isDeleting}
							size="small"
							theme="accent"
						/>
					}
					onClick={handleDeleteButtonClick}
					type="button"
					variant="secondary"
				/>
				<Button
					label="Cancel"
					onClick={handleCancelClick}
					type="button"
					variant="secondary"
				/>
			</div>
		</div>
	);
};

export { DeleteFeedbackModal };
