import { type FC } from "react";

import { type UserDto } from "~/libs/types/user/types.js";

import { UserAvatar } from "../user-avatar/user-avatar.js";
import styles from "./styles.module.css";

type FeedbackCardProperties = {
	text: string;
	user: User;
	userId?: number;
};

type User = null | Pick<UserDto, "avatarUrl" | "id" | "name">;

const FeedbackCard: FC<FeedbackCardProperties> = ({ text, user }) => {
	return (
		<div className={styles["card"]}>
			<p className={styles["text"]}>{text}</p>
			<div className={styles["footer"]}>
				<UserAvatar alt={user?.name ?? "User"} src={user?.avatarUrl ?? null} />
				<span className={styles["name"]}>{user?.name ?? "Anonymous"}</span>
			</div>
		</div>
	);
};

export { FeedbackCard };
