import { useEffect, useState } from "react";

import {
	Edit,
	Regenerate,
	Remove,
	Save,
	Timer,
} from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppDispatch, useCallback } from "~/libs/hooks/hooks.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import styles from "./styles.module.css";

type Properties = {
	indexItem: number;
	item: {
		description: string;
		id: number;
		title: string;
	};
};

const Task: React.FC<Properties> = ({ indexItem, item }: Properties) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedTitle, setEditedTitle] = useState<string>(item.title);
	const [editedDescription, setEditedDescription] = useState<string>(
		item.description,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		setEditedTitle(item.title);
		setEditedDescription(item.description);
	}, [item.title, item.description]);

	const handleEditClick = useCallback((): void => {
		if (isEditing) {
			setEditedTitle(item.title);
			setEditedDescription(item.description);
			setIsEditing(false);
		} else {
			setIsEditing(true);
		}
	}, [isEditing, item.title, item.description]);

	const handleSaveClick = useCallback((): void => {
		void dispatch(
			taskActions.updateTask({
				id: item.id,
				payload: {
					description: editedDescription,
					title: editedTitle,
				},
			}),
		);
		setIsEditing(false);
	}, [dispatch, item.id, editedDescription, editedTitle]);

	const handleTitleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			setEditedTitle(event.target.value);
		},
		[],
	);

	const handleDescriptionChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
			setEditedDescription(event.target.value);
		},
		[],
	);

	const handleDeleteClick = useCallback((): void => {
		void dispatch(taskActions.deleteTask(item.id));
	}, [dispatch, item.id]);

	return (
		<div
			className={getClassNames(
				styles["content__tasks-item"],
				"wrapper",
				styles[`color-${String(indexItem)}`],
			)}
			key={indexItem}
		>
			<h3>{indexItem}</h3>
			<div className={styles["description-wrapper"]}>
				{isEditing ? (
					<>
						<input
							className={getClassNames(
								styles["edit-input"],
								styles["edit-input-title"],
							)}
							onChange={handleTitleChange}
							placeholder="Task title"
							type="text"
							value={editedTitle}
						/>
						<textarea
							className={getClassNames(
								styles["edit-input"],
								styles["edit-input-description"],
							)}
							onChange={handleDescriptionChange}
							placeholder="Task description"
							value={editedDescription}
						/>
						<div className={styles["save-button-wrapper"]}>
							<Button
								className={getClassNames(styles["save-button"])}
								icon={<DecorativeImage src={Save} />}
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
						<p>{item.description}</p>
					</>
				)}
			</div>
			<div className={styles["item-actions"]}>
				<div className={styles["item-actions__time"]}>
					<img alt="" src={Timer} />
					<span>morning</span>
				</div>
				<div className={styles["item-actions_buttons-wrapper"]}>
					<Button
						className={getClassNames(styles["item-actions_button"])}
						icon={<DecorativeImage src={Edit} />}
						isIconOnly
						label=""
						onClick={handleEditClick}
					/>
					<Button
						className={getClassNames(styles["item-actions_button"])}
						icon={<DecorativeImage src={Regenerate} />}
						isIconOnly
						label=""
					/>
					<Button
						className={getClassNames(styles["item-actions_button"])}
						icon={<DecorativeImage src={Remove} />}
						isIconOnly
						label=""
						onClick={handleDeleteClick}
					/>
				</div>
			</div>
		</div>
	);
};

export { Task };
