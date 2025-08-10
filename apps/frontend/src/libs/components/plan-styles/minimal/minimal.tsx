import styles from "./styles.module.css";

const PlanStyleMinimal: React.FC = () => {
	return (
		<>
			<section className={styles["container"]}>
				<header className={styles["header"]}>
					<h1 className={styles["plan-title"]}>Plan title</h1>
				</header>
				<div className={styles["plan-body"]}>
					<div className={styles["day-section"]}>
						<h2 className={styles["day-header"]}>Day 1</h2>
						<ol className={styles["day-list"]}>
							<li className={styles["task"]}>
								<input
									className={styles["task-checkbox"]}
									id="1"
									name="Task1"
									type="checkbox"
								/>
								<label className={styles["task-text"]} htmlFor="1">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
									nemo adipisci deserunt tempore, obcaecati dicta ipsum iste
									ipsam accusantium eveniet, cumque eaque eum aut quia excepturi
									dignissimos commodi necessitatibus cum.
								</label>
							</li>
							<li className={styles["task"]}>
								<input
									className={styles["task-checkbox"]}
									id="2"
									name="Task2"
									type="checkbox"
								/>
								<label className={styles["task-text"]} htmlFor="2">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
									nemo adipisci deserunt tempore, obcaecati dicta ipsum iste
									ipsam accusantium eveniet, cumque eaque eum aut quia excepturi
									dignissimos commodi necessitatibus cum.
								</label>
							</li>
							<li className={styles["task"]}>
								<input
									className={styles["task-checkbox"]}
									id="3"
									name="Task3"
									type="checkbox"
								/>
								<label className={styles["task-text"]} htmlFor="3">
									Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
									nemo adipisci deserunt tempore, obcaecati dicta ipsum iste
									ipsam accusantium eveniet, cumque eaque eum aut quia excepturi
									dignissimos commodi necessitatibus cum.
								</label>
							</li>
						</ol>
					</div>
				</div>
			</section>
		</>
	);
};

export { PlanStyleMinimal };
