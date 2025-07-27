import {
	cat,
	greenFlower,
	pinkStars,
	yellowStars,
	yellowTwinkles,
} from "~/assets/img/home/starting-page/home-starting-page.img.js";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const StartingPage: React.FC = () => (
	<section className={getClassNames(styles["starting-page"], "mesh")}>
		<div className={getClassNames(styles["container"], "wrapper flow-loose")}>
			<div className={styles["text-wrapper"]}>
				<h1 className="h1">Create a personal development plan in 2 minutes</h1>
				<h4 className="h4">
					AI-powered checklist generator for your goals — from fitness to
					creativity
				</h4>
				<Link to={AppRoute.ROOT}>Start</Link>
			</div>
			<div className={styles["icons-wrapper"]}>
				<img
					alt="floating-image"
					className={getClassNames(
						styles["floating-image"],
						styles["green-flower"],
					)}
					src={greenFlower}
				/>
				<img
					alt="floating-image"
					className={getClassNames(
						styles["floating-image"],
						styles["yellow-twinkles"],
					)}
					src={yellowTwinkles}
				/>
				<img
					alt="floating-image"
					className={getClassNames(
						styles["floating-image"],
						styles["yellow-stars"],
					)}
					src={yellowStars}
				/>
				<img
					alt="floating-image"
					className={getClassNames(
						styles["floating-image"],
						styles["pink-stars"],
					)}
					src={pinkStars}
				/>
				<img
					alt="floating-image"
					className={getClassNames(styles["floating-image"], styles["cat"])}
					src={cat}
				/>
			</div>
		</div>
	</section>
);

export { StartingPage };
