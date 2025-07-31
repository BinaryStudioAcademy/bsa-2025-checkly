import { type FC } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { FEEDBACKS } from "../../lib/constants.js";
import { FeedbackCard } from "./components/feedback-card/feedback-card.js";
import { FeedbackSectionDecoration } from "./components/feedback-decoration/feedbacksection-decoration.js";
import styles from "./styles.module.css";

const FeedbacksSection: FC = () => {
	return (
		<div className={getClassNames(styles["wrapper"])}>
			<FeedbackSectionDecoration />
			<div className={styles["container"]}>
				<h2 className={styles["title"]}>Testimonials</h2>
				<div className={styles["grid"]}>
					{FEEDBACKS.map((item) => (
						<FeedbackCard key={item.id} {...item} />
					))}
				</div>
			</div>
		</div>
	);
};

export { FeedbacksSection };
