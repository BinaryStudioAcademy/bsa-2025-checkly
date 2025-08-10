import styles from "./styles.module.css";

type Properties = {
	id: string;
	taskText: string;
};

const Task: React.FC<Properties> = ({ id, taskText }: Properties) => {
	return (
		<li className={styles["task"]} key={id}>
			<input
				className={styles["task-checkbox"]}
				id={id}
				name={`Task${id}`}
				type="checkbox"
			/>
			<label className={styles["task-text"]} htmlFor={id}>
				{taskText}
			</label>
		</li>
	);
};

export { Task };
