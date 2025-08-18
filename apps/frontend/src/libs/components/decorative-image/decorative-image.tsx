import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	src: string;
};

const DecorativeImage: React.FC<Properties> = ({
	className = "",
	src,
}: Properties) => (
	<img
		alt=""
		aria-hidden="true"
		className={getClassNames(styles["decorative-image"], className)}
		draggable="false"
		loading="lazy"
		src={src}
	/>
);

export { DecorativeImage };
