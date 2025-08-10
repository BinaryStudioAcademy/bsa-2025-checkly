import styles from "./styles.module.css";

const notes = {
	HINT: "Use this space to reflect on any patterns, surprises, or small wins from the week. Honor your progress.",
	TEXT: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere reprehenderit dignissimos non cumque tenetur porro quod.",
	TITLE: "Notes:",
};

const Notes: React.FC = () => {
	return (
		<li className={styles["notes"]}>
			<h2 className={styles["notes-title"]}>{notes.TITLE}</h2>
			<p className={styles["notes-hint"]}>{notes.HINT}</p>
			<p className={styles["notes-text"]}>&emsp;{notes.TEXT}</p>
		</li>
	);
};

export { Notes };
