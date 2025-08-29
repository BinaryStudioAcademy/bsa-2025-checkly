import { useEffect, useState } from "react";

import { Edit, Regenerate, Remove, Save } from "~/assets/img/icons/icons.js";
import {
	Button,
	ConfirmationModal,
	DecorativeImage,
	Modal,
	TaskTimeSelector,
} from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { actions as planActions } from "~/modules/plans/plans.js";
import { TaskValidationRule } from "~/modules/tasks/libs/enums/enums.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { MODAL_MESSAGES } from "../../libs/constants/constants.js";
import {
	type ExecutionTimeTypeValue,
	type TaskDto,
} from "../../libs/types/types.js";
import styles from "../../shared/task/styles.module.css";

type Properties = {
	indexItem: number;
	item: TaskDto;
	onRegenerate: (index: number) => void;
};

const Task: React.FC<Properties> = ({
	indexItem,
	item,
	onRegenerate,
}: Properties) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedTitle, setEditedTitle] = useState<string>(item.title);

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isRegenerateTaskModalOpen, setIsRegenerateTaskModalOpen] =
		useState<boolean>(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		setEditedTitle(item.title);
	}, [item.title]);

	const handleEditClick = useCallback((): void => {
		if (isEditing) {
			setEditedTitle(item.title);
			setIsEditing(false);
		} else {
			setIsEditing(true);
		}
	}, [isEditing, item.title]);

	const handleSaveClick = useCallback((): void => {
		void (async (): Promise<void> => {
			await dispatch(
				taskActions.updateTask({
					id: item.id,
					payload: {
						title: editedTitle,
					},
				}),
			);
			await dispatch(planActions.getPlan());
			setIsEditing(false);
		})();
	}, [dispatch, item.id, editedTitle]);

	const handleUpdateTaskTime = useCallback(
		(newTime: ExecutionTimeTypeValue): void => {
			void (async (): Promise<void> => {
				await dispatch(
					taskActions.updateTask({
						id: item.id,
						payload: {
							executionTimeType: newTime,
						},
					}),
				);
				await dispatch(planActions.getPlan());
			})();
		},
		[dispatch, item.id],
	);

	const handleTitleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			setEditedTitle(event.target.value);
		},
		[],
	);

	const handleDeleteClick = useCallback((): void => {
		setIsDeleteModalOpen(true);
	}, []);

	const handleConfirmDelete = useCallback((): void => {
		void (async (): Promise<void> => {
			await dispatch(taskActions.deleteTask(item.id));
			setIsDeleteModalOpen(false);
			await dispatch(planActions.getPlan());
		})();
	}, [dispatch, item.id]);

	const handleCancelDelete = useCallback((): void => {
		setIsDeleteModalOpen(false);
	}, []);

	const handleRegenerateClick = useCallback((): void => {
		setIsRegenerateTaskModalOpen(true);
	}, []);

	const handleRegenerateConfirm = useCallback((): void => {
		onRegenerate(item.id);
		setIsRegenerateTaskModalOpen(false);
	}, [item.id, onRegenerate]);

	const handleRegenerateCancel = useCallback((): void => {
		setIsRegenerateTaskModalOpen(false);
	}, []);

	return (
		<>
			<div
				className={getClassNames(
					styles["content__tasks-item"],
					"wrapper",
					styles[`color-${String(indexItem)}`],
				)}
				key={indexItem}
			>
				<h3 className={styles["task-title"]}>{indexItem}</h3>
				<div className={styles["description-wrapper"]}>
					{isEditing ? (
						<>
							<input
								className={getClassNames(
									styles["edit-input"],
									styles["edit-input-title"],
								)}
								maxLength={TaskValidationRule.TITLE_MAX_LENGTH}
								onChange={handleTitleChange}
								placeholder="Task title"
								type="text"
								value={editedTitle}
							/>
							<div className={styles["char-counter"]}>
								{editedTitle.length}/{TaskValidationRule.TITLE_MAX_LENGTH}{" "}
								characters
							</div>
							<div className={styles["save-button-wrapper"]}>
								<Button
									className={getClassNames(styles["save-button"])}
									icon={<Save />}
									isIconOnly
									label="Save"
									onClick={handleSaveClick}
									variant="primary"
								/>
							</div>
						</>
					) : (
						<>
							<h5>{item.title}</h5>
						</>
					)}
				</div>
				<div className={styles["item-actions"]}>
					<div>
						<TaskTimeSelector
							currentTime={item.executionTimeType}
							onTimeChange={handleUpdateTaskTime}
						/>
					</div>
					<div className={styles["item-actions_buttons-wrapper"]}>
						<Button
							className={getClassNames(styles["item-actions_button"])}
							icon={<DecorativeImage src={Edit} />}
							isIconOnly
							label="Edit task"
							onClick={handleEditClick}
						/>
						<Button
							className={getClassNames(styles["item-actions_button"])}
							icon={<DecorativeImage src={Regenerate} />}
							isIconOnly
							label="Regenerate task"
							onClick={handleRegenerateClick}
						/>
						<Button
							className={getClassNames(styles["item-actions_button"])}
							icon={<DecorativeImage src={Remove} />}
							isIconOnly
							label="Remove task"
							onClick={handleDeleteClick}
						/>
					</div>
				</div>
			</div>
			<Modal
				isOpen={isDeleteModalOpen}
				onClose={handleCancelDelete}
				title="Delete Task"
			>
				<div className={styles["delete-modal-content"]}>
					<p>{MODAL_MESSAGES.TASK_DELETION}</p>
					<div className={styles["delete-modal-actions"]}>
						<Button
							className={getClassNames(styles["modal-actions-button"])}
							label="Cancel"
							onClick={handleCancelDelete}
							variant="secondary"
						/>
						<Button
							className={getClassNames(styles["modal-actions-button"])}
							label="Delete"
							onClick={handleConfirmDelete}
							variant="primary"
						/>
					</div>
				</div>
			</Modal>
			<ConfirmationModal
				isOpen={isRegenerateTaskModalOpen}
				message={MODAL_MESSAGES.TASK_REGENERATION}
				onCancel={handleRegenerateCancel}
				onConfirm={handleRegenerateConfirm}
				title="Task Regeneration"
			/>
		</>
	);
};

export { Task };
