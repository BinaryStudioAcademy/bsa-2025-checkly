import { type FC, useCallback, useState } from "react";

import { Button, Modal } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { NO_ITEMS, SINGLE_PAGE } from "~/pages/home/lib/constants.js";

import { FeedbackSectionDecoration } from "./components/feedback-decoration/feedbacksection-decoration.js";
import { FeedbackList } from "./components/feedback-list/feedback-list.js";
import { AddFeedbackModal } from "./components/feedback-modals/add-feedback.modal.js";
import { DeleteFeedbackModal } from "./components/feedback-modals/delete-feedback.modal.js";
import { EditFeedbackModal } from "./components/feedback-modals/edit-feedback.modal.js";
import styles from "./styles.module.css";

type ModalTypeUnion = "CREATE" | "DELETE" | "EDIT";
type OpenModalType = ModalTypeUnion | null;

const FeedbacksSection: FC = () => {
	const [feedbackIdToEdit, setFeedbackIdToEdit] = useState<null | number>(null);
	const [feedbackIdToDelete, setFeedbackIdToDelete] = useState<null | number>(
		null,
	);
	const [openModal, setOpenModal] = useState<OpenModalType>(null);
	const [reloadTrigger, setReloadTrigger] = useState<number>(NO_ITEMS);

	const { dataStatus, user } = useAppSelector(({ auth }) => auth);
	const isAuthorized = dataStatus === DataStatus.FULFILLED && user;

	const handleOpenModal = useCallback(
		(type: OpenModalType, idToEdit: null | number = null): (() => void) =>
			() => {
				setOpenModal(type);

				if (type === "EDIT" && idToEdit) {
					setFeedbackIdToEdit(idToEdit);
				}

				if (type === "DELETE" && idToEdit) {
					setFeedbackIdToDelete(idToEdit);
				}
			},
		[],
	);

	const handleCloseModal = useCallback(() => {
		setOpenModal(null);
		setFeedbackIdToEdit(null);
		setFeedbackIdToDelete(null);
	}, []);

	const handleCloseModalAndUpdate = useCallback(() => {
		handleCloseModal();
		setReloadTrigger((previous) => previous + SINGLE_PAGE);
	}, [handleCloseModal]);

	return (
		<section
			className={getClassNames(
				"grid-pattern",
				styles["landing-section"],
				styles["light-background"],
			)}
		>
			<div className={getClassNames("wrapper", styles["feedback-wrapper"])}>
				<FeedbackSectionDecoration />
				<div className={getClassNames("flow", styles["container"])}>
					<h2 className={styles["title"]}>Testimonials</h2>
					<FeedbackList
						onOpenModal={handleOpenModal}
						reloadTrigger={reloadTrigger}
						user={user}
					/>
					{isAuthorized && (
						<Button
							label="Share your feedback"
							onClick={handleOpenModal("CREATE")}
							size="large"
							type="button"
							variant="primary"
						/>
					)}
				</div>
			</div>
			{openModal === "CREATE" && (
				<Modal isOpen onClose={handleCloseModal} title="Add your feedback">
					<AddFeedbackModal
						onClose={handleCloseModalAndUpdate}
						userId={user?.id}
					/>
				</Modal>
			)}
			{openModal === "EDIT" && feedbackIdToEdit && (
				<Modal isOpen onClose={handleCloseModal}>
					<EditFeedbackModal
						id={feedbackIdToEdit}
						onClose={handleCloseModalAndUpdate}
					/>
				</Modal>
			)}
			{openModal === "DELETE" && feedbackIdToDelete && (
				<Modal isOpen onClose={handleCloseModal}>
					<DeleteFeedbackModal
						handleCancelClick={handleCloseModal}
						id={feedbackIdToDelete}
						onClose={handleCloseModalAndUpdate}
					/>
				</Modal>
			)}
		</section>
	);
};

export { FeedbacksSection };
