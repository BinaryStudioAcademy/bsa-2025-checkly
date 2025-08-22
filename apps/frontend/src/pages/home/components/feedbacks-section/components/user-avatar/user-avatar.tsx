import { type FC, useMemo } from "react";

import { AvatarDefault } from "~/assets/img/shared/avatars/avatars.img.js";

import styles from "./styles.module.css";

type AvatarProperties = {
	alt: string;
	src: null | string;
};

const UserAvatar: FC<AvatarProperties> = ({ alt, src }) => {
	const displayAvatar = useMemo(() => src ?? AvatarDefault, [src]);

	return (
		<>
			<div className={styles["wrapper"]}>
				<img
					alt={alt}
					className={styles["image"]}
					draggable="false"
					src={displayAvatar}
				/>
			</div>
		</>
	);
};

export { UserAvatar };
