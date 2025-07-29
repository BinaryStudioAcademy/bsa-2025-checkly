import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const HowItWorks: React.FC = () => {
	return (
		<section className={getClassNames("grid-pattern", styles["section"])} data-section-variant="brand">
			<div className={styles["wrapper"]}>
				<div className={styles["container"]}>
					<h2 className={styles["title"]}>How it works</h2>

					<div className={styles["stepsContainer"]}>
						<div className={styles["step"]}>
							<div className={styles["stepNumber"]}>1</div>
							<h3 className={styles["stepTitle"]}>Take the quiz</h3>
						</div>

						<div className={styles["arrow"]}>
							<img
								alt="Arrow pointing to next step"
								className={styles["arrowImage"]}
								src="/src/assets/img/home/how-it-works/arrow.svg"
							/>
						</div>

						<div className={styles["step"]}>
							<div className={styles["stepNumber"]}>2</div>
							<h3 className={styles["stepTitle"]}>Get your plan</h3>
						</div>

						<div className={styles["arrow"]}>
							<img
								alt="Arrow pointing to next step"
								className={styles["arrowImage"]}
								src="/src/assets/img/home/how-it-works/arrow.svg"
							/>
						</div>

						<div className={styles["step"]}>
							<div className={styles["stepNumber"]}>3</div>
							<h3 className={styles["stepTitle"]}>
								Download PDF or customize it
							</h3>
						</div>
					</div>

					<div className={styles["croissantImage"]}>
						<img
							alt="Croissant"
							src="/src/assets/img/home/how-it-works/croissant.svg"
						/>
					</div>

					<div className={styles["laptopImage"]}>
						<img
							alt="Laptop"
							src="/src/assets/img/home/how-it-works/laptop.svg"
						/>
					</div>

					<div className={styles["decorativeStars"]}>
						<img
							alt="Decorative stars"
							className={styles["starsImage"]}
							src="/src/assets/img/home/how-it-works/yellow_stars.svg"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export { HowItWorks };