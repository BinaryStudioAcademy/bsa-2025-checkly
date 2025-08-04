import { type FC } from "react";

import {
	Dog,
	OrangeWhole,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import {
	StarsPink02,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { DecorativeImage } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const FeedbackSectionDecoration: FC = () => {
	return (
		<>
			<div className={styles["decorStarsTop"]}>
				<DecorativeImage src={TwinklesYellow} />
			</div>
			<div className={styles["orangeDecor"]}>
				<DecorativeImage src={OrangeWhole} />
			</div>
			<div className={styles["dogImage"]}>
				<div className={styles["pinkStars"]}>
					<DecorativeImage src={StarsPink02} />
				</div>
				<div className={styles["dogImageInner"]}>
					<DecorativeImage src={Dog} />
				</div>
			</div>
		</>
	);
};

export { FeedbackSectionDecoration };
