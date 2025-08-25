import styles from "./styles.module.css";

const QuizCategoryCardSkeleton: React.FC = (): React.ReactElement => {
	return (
		<div>
			<div className={styles["skeleton-body"]} />
		</div>
	);
};

export { QuizCategoryCardSkeleton };
