import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const QuizCategoryCardSkeleton: React.FC = (): React.ReactElement => {
	return (
		<div
			className={
				getClassNames()
				// "flow",
				// styles["quiz-category-card"],
				// styles["quiz-category-card-skeleton"],
			}
		>
			{/* <div className={styles["quiz-category-card-skeleton-image"]}> */}
			{/* <div className={styles["skeleton-icon"]} /> */}
			{/* </div> */}
			<div className={styles["skeleton-body"]} />
		</div>
	);
};

export { QuizCategoryCardSkeleton };
