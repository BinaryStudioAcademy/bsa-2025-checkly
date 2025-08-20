import { type FC } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

import { type UserDto } from "~/libs/types/user/types.js";

import { UserAvatar } from "../user-avatar/user-avatar.js";
import styles from "./styles.module.css";

type FeedbackCardProperties = {
	onDeleteClick: () => void;
	onEditClick: () => void;
	text: string;
	user: User;
	userId: number | undefined;
};

type User = null | Pick<UserDto, "avatarUrl" | "id" | "name">;

const FeedbackCard: FC<FeedbackCardProperties> = ({
	onDeleteClick,
	onEditClick,
	text,
	user,
	userId,
}) => {
	return (
		<div className={styles["card"]}>
			{userId === user?.id && (
				<div className={styles["button-section"]}>
					<FiEdit className={styles["icon"]} onClick={onEditClick} />
					<FiTrash className={styles["icon"]} onClick={onDeleteClick} />
				</div>
			)}

			<p className={styles["text"]}>{text}</p>
			<div className={styles["footer"]}>
				<UserAvatar alt={user?.name ?? "User"} src={user?.avatarUrl} />
				<span className={styles["name"]}>{user?.name ?? "Anonymous"}</span>
			</div>
		</div>
	);
};

export { FeedbackCard };
