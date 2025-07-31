import { type FC } from "react";

import styles from "./styles.module.css";

const FeedbackSectionDecoration: FC = () => {
	return (
		<>
			<div className={styles["decorStarsTop"]}>
				<img alt="" src="src/assets/img/home/yellow-stars_2x.svg" />
			</div>
			<div className={styles["orangeDecor"]}>
				<img alt="" src="src/assets/img/home/orange.png" />
			</div>
			<div className={styles["dogImage"]}>
				<div className={styles["pinkStars"]}>
					<img alt="" src="src/assets/img/home/pink-stars_2x.svg" />
				</div>
				<div className={styles["dogImageInner"]}>
					<img alt="" src="src/assets/img/home/dog.png" />
				</div>
			</div>
		</>
	);
};

export { FeedbackSectionDecoration };
