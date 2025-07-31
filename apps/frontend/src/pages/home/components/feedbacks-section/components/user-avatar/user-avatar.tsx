import { type FC } from "react";

import styles from "./styles.module.css";

interface Properties {
	alt: string;
	src: string;
}

const UserAvatar: FC<Properties> = ({ alt, src }) => {
	return (
		<div className={styles["wrapper"]}>
			<img alt={alt} className={styles["image"]} src={src} />
		</div>
	);
};

export { UserAvatar };
