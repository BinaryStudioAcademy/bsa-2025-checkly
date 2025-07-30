import {
	cat,
	greenFlower,
	pinkStars,
	yellowStars,
	yellowTwinkles,
} from "~/assets/img/home/home.img.js";
import { Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const Hero: React.FC = () => (
	<section className={getClassNames(styles["hero"], "grid-pattern")}>
		<div className={getClassNames(styles["container"], "wrapper flow-loose")}>
			<div className={getClassNames(styles["text-wrapper"], "flow")}>
				<div className="flow-loose">
					<h1>Create a personal development plan in 2 minutes</h1>
					<h4>
						AI-powered checklist generator for your goals — from fitness to
						creativity
					</h4>
				</div>
				<Link asButton to={AppRoute.ROOT}>
					Start
				</Link>
			</div>
			<div className={styles["icons-wrapper"]}>
				<img
					alt=""
					className={getClassNames(
						styles["floating-image"],
						styles["green-flower"],
					)}
					src={greenFlower}
				/>
				<img
					alt=""
					className={getClassNames(
						styles["floating-image"],
						styles["yellow-twinkles"],
					)}
					src={yellowTwinkles}
				/>
				<img
					alt=""
					className={getClassNames(
						styles["floating-image"],
						styles["yellow-stars"],
					)}
					src={yellowStars}
				/>
				<img
					alt=""
					className={getClassNames(
						styles["floating-image"],
						styles["pink-stars"],
					)}
					src={pinkStars}
				/>
				<img
					alt=""
					className={getClassNames(styles["floating-image"], styles["cat"])}
					src={cat}
				/>
			</div>
		</div>
	</section>
);

export { Hero };
