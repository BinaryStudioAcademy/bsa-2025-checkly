import { type FC, useCallback, useState } from "react";

import { Modal } from "~/libs/components/components.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { selectFeedbackByUserId } from "~/modules/feedbacks/feedbacks.js";

import { FeedbackButton } from "./components/feedback-button/feedback-button.js";
import { AddFeedbackModal } from "./components/feedback-modals/add-feedback.modal.js";
import { DeleteFeedbackModal } from "./components/feedback-modals/delete-feedback.modal.js";
import { EditFeedbackModal } from "./components/feedback-modals/edit-feedback.modal.js";

type ModalTypeUnion = "CREATE" | "DELETE" | "EDIT";
type OpenModalType = ModalTypeUnion | null;

type Properties = {
	modalReference?: React.RefObject<HTMLDialogElement | null>;
	type: "side-panel" | "user-menu";
};

const FeedbackManager: FC<Properties> = ({ modalReference, type }) => {
	const [feedbackIdToEdit, setFeedbackIdToEdit] = useState<null | number>(null);
	const [feedbackIdToDelete, setFeedbackIdToDelete] = useState<null | number>(
		null,
	);
	const [openModal, setOpenModal] = useState<OpenModalType>(null);

	const user = useAppSelector((state) => state.auth.user);
	const existingFeedback = useAppSelector((state) =>
		selectFeedbackByUserId(state, user?.id),
	);

	const handleOpenModal = useCallback(
		(modalType: OpenModalType, idToEdit: null | number = null) => {
			setOpenModal(modalType);

			if (modalType === "EDIT" && idToEdit) {
				setFeedbackIdToEdit(idToEdit);
			}

			if (modalType === "DELETE" && idToEdit) {
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

	const handleOpenDeleteModal = useCallback((id: number) => {
		setFeedbackIdToDelete(id);
		setOpenModal("DELETE");
	}, []);

	const handleCloseDeleteModal = useCallback(() => {
		setOpenModal("CREATE");
		setFeedbackIdToDelete(null);
	}, []);

	const modalTitle = existingFeedback
		? "Edit your feedback"
		: "Add your feedback";

	return (
		<>
			<FeedbackButton handleOpenModal={handleOpenModal} type={type} />

			{openModal === "CREATE" && (
				<Modal
					isOpen
					modalReference={modalReference}
					onClose={handleCloseModal}
					title={modalTitle}
				>
					<AddFeedbackModal
						existingFeedback={existingFeedback}
						onClose={handleCloseModal}
						onDeleteClick={handleOpenDeleteModal}
						userId={user?.id}
					/>
				</Modal>
			)}
			{openModal === "EDIT" && feedbackIdToEdit && (
				<Modal
					isOpen
					modalReference={modalReference}
					onClose={handleCloseModal}
					title={modalTitle}
				>
					<EditFeedbackModal
						id={feedbackIdToEdit}
						onClose={handleCloseModal}
						userId={user?.id}
					/>
				</Modal>
			)}
			{openModal === "DELETE" && feedbackIdToDelete && (
				<Modal
					isOpen
					modalReference={modalReference}
					onClose={handleCloseDeleteModal}
					title="Delete this feedback?"
				>
					<DeleteFeedbackModal
						handleCancelClick={handleCloseDeleteModal}
						id={feedbackIdToDelete}
						onClose={handleCloseModal}
					/>
				</Modal>
			)}
		</>
	);
};

export { FeedbackManager };
