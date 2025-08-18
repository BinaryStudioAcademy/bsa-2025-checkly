import { type FC } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

import { Avatar01 } from "~/assets/img/shared/avatars/avatars.img.js";

import { UserAvatar } from "../user-avatar/user-avatar.js";
import styles from "./styles.module.css";

type FeedbackCardProperties = {
	onDeleteClick: () => void;
	onEditClick: () => void;
	text: string;
	user: User;
	userId: number | undefined;
};

type User = null | {
	id: number;
	name: string;
};

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
				<UserAvatar alt={user?.name ?? "User"} src={Avatar01} />
				<span className={styles["name"]}>{user?.name ?? "Anonymous"}</span>
			</div>
		</div>
	);
};

export { FeedbackCard };
