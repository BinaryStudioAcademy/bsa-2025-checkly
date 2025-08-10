import styles from "./styles.module.css";

type Properties = {
	title: string;
};

const PlanHeader: React.FC<Properties> = ({ title }: Properties) => {
	return (
		<header className={styles["header"]}>
			<h1 className={styles["plan-title"]}>{title}</h1>
		</header>
	);
};

export { PlanHeader };
