import { type FC } from "react";
import "react-toastify/dist/ReactToastify.css";

import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { FeedbackSectionDecoration } from "./components/feedback-decoration/feedbacksection-decoration.js";
import { FeedbackList } from "./components/feedback-list/feedback-list.js";
import styles from "./styles.module.css";

const FeedbacksSection: FC = () => {
	const { user } = useAppSelector(({ auth }) => auth);

	return (
		<section
			className={getClassNames(
				"grid-pattern",
				styles["landing-section"],
				styles["light-background"],
			)}
		>
			<div className={getClassNames("wrapper", styles["feedback-wrapper"])}>
				<FeedbackSectionDecoration />
				<div className={getClassNames("flow", styles["container"])}>
					<h2 className={styles["title"]}>Testimonials</h2>
					<FeedbackList user={user} />
				</div>
			</div>
		</section>
	);
};

export { FeedbacksSection };
