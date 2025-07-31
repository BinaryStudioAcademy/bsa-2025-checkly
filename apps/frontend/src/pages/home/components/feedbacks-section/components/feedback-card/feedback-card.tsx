import { type FC } from "react";

import { UserAvatar } from "../user-avatar/user-avatar.js";
import styles from "./styles.module.css";

interface Properties {
	avatar: string;
	name: string;
	text: string;
}

const FeedbackCard: FC<Properties> = ({ avatar, name, text }) => {
	return (
		<div className={styles["card"]}>
			<p className={styles["text"]}>{text}</p>
			<div className={styles["footer"]}>
				<UserAvatar alt={name} src={avatar} />
				<span className={styles["name"]}>{name}</span>
			</div>
		</div>
	);
};

export { FeedbackCard };
