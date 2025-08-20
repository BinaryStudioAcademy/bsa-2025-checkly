import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Loader } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { feedbackApi } from "~/modules/feedbacks/feedbacks.js";
import { type FeedbackDto } from "~/modules/feedbacks/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	handleCancelClick: () => void;
	id: number;
	onClose: () => void;
};

const DeleteFeedbackModal: React.FC<Properties> = ({
	handleCancelClick,
	id,
	onClose,
}: Properties) => {
	const [isFetching, setIsFetching] = useState<boolean>(true);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [feedbackToDelete, setFeedbackToDelete] = useState<FeedbackDto | null>(
		null,
	);

	useEffect(() => {
		const fetchFeedback = async (): Promise<void> => {
			setIsFetching(true);
			const fetchedFeedback = await feedbackApi.findById(id);

			if (fetchedFeedback) {
				setFeedbackToDelete(fetchedFeedback);
			}

			setIsFetching(false);
		};

		void fetchFeedback();
	}, [id]);

	const handleDeleteClick = useCallback(async (): Promise<void> => {
		setIsDeleting(true);

		try {
			await feedbackApi.delete(id);
			toast.success("Feedback was successfully deleted!");
			onClose();
		} catch {
			toast.error("Failed to delete feedback. Please try again later.");
		} finally {
			setIsDeleting(false);
		}
	}, [id, onClose]);

	const handleButtonClick = useCallback(() => {
		void handleDeleteClick();
	}, [handleDeleteClick]);

	if (isFetching || !feedbackToDelete) {
		return (
			<div className={styles["loader-container"]}>
				<Loader container="inline" size="large" />
			</div>
		);
	}

	return (
		<div
			aria-labelledby="feedback-title"
			className={getClassNames(styles["delete-modal"], "cluster")}
		>
			<h2 className={styles["feedback-title"]} id="feedback-title">
				Do you want to delete this feedback?
			</h2>
			<p className={styles["feedback-text"]}>{feedbackToDelete.text}</p>
			<div className={getClassNames(styles["button-group"], "cluster")}>
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
					onClick={handleButtonClick}
					type="button"
				/>
				<Button label="Cancel" onClick={handleCancelClick} type="button" />
			</div>
		</div>
	);
};

export { DeleteFeedbackModal };
