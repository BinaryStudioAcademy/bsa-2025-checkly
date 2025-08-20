import { type FC } from "react";
import { FiUser } from "react-icons/fi";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type AvatarProperties = {
	alt: string;
	src: null | string | undefined;
};

const UserAvatar: FC<AvatarProperties> = ({ alt, src }) => {
	return (
		<>
			{src ? (
				<div className={styles["wrapper"]}>
					<img
						alt={alt}
						className={styles["image"]}
						draggable="false"
						src={src}
					/>
				</div>
			) : (
				<div
					className={getClassNames(
						"cluster",
						styles["wrapper"],
						styles["default-icon-wrapper"],
					)}
				>
					<FiUser className={styles["default-icon"]} />
				</div>
			)}
		</>
	);
};

export { UserAvatar };
