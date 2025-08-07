import {
	Croissant,
	Laptop,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import { Arrow, StarsYellow02 } from "~/assets/img/shared/shapes/shapes.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const HowItWorks: React.FC = () => {
	const stepBlockClasses = getClassNames(styles["step"], "flow");

	return (
		<section
			className={getClassNames("grid-pattern", styles["section"])}
			data-section-variant="brand"
		>
			<div className={getClassNames("wrapper", styles["container"])}>
				<h2 className={styles["title"]}>How it works</h2>
				<div className={styles["stepsContainer"]}>
					<div className={stepBlockClasses}>
						<div className={styles["stepNumber"]}>1</div>
						<p className={styles["stepTitle"]}>Take the quiz</p>
					</div>
					<div className={styles["arrow"]}>
						<DecorativeImage
							className={getClassNames(styles["arrowImage"])}
							src={Arrow}
						/>
					</div>
					<div className={stepBlockClasses}>
						<div className={styles["stepNumber"]}>2</div>
						<p className={styles["stepTitle"]}>Get your plan</p>
					</div>
					<div className={styles["arrow"]}>
						<DecorativeImage
							className={getClassNames(styles["arrowImage"])}
							src={Arrow}
						/>
					</div>
					<div className={stepBlockClasses}>
						<div className={styles["stepNumber"]}>3</div>
						<p className={styles["stepTitle"]}>Download PDF or customize it</p>
					</div>
				</div>
				<div className={styles["croissantImage"]}>
					<DecorativeImage src={Croissant} />
				</div>
				<div className={styles["laptopImage"]}>
					<DecorativeImage src={Laptop} />
				</div>
				<div className={styles["decorativeStars"]}>
					<DecorativeImage
						className={getClassNames(styles["starsImage"])}
						src={StarsYellow02}
					/>
				</div>
			</div>
		</section>
	);
};

export { HowItWorks };
