import { type FC } from "react";

import styles from "./styles.module.css";

type AvatarProperties = {
	alt: string;
	src: string;
}

const UserAvatar: FC<AvatarProperties> = ({ alt, src }) => {
	return (
		<div className={styles["wrapper"]}>
			<img alt={alt} className={styles["image"]} src={src} />
		</div>
	);
};

export { UserAvatar };
