import styles from "./styles.module.css";

const Header: React.FC = () => {
	return (
		<header className={styles["header"]}>
			<div className="wrapper repel">
				<span className={styles["header__logo"]}>Logo</span>
			</div>
		</header>
	);
};

export { Header };
