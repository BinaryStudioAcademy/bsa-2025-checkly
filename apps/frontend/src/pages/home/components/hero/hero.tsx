import {
	cat,
	greenFlower,
	pinkStars,
	yellowStars,
	yellowTwinkles,
} from "~/assets/img/home/home.img.js";
import { DecorativeImage, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const decorativeImages = [
	{
		className: styles["green-flower"],
		key: "green-flower",
		src: greenFlower,
	},
	{
		className: styles["yellow-twinkles"],
		key: "yellow-twinkles",
		src: yellowTwinkles,
	},
	{
		className: styles["yellow-stars"],
		key: "yellow-stars",
		src: yellowStars,
	},
	{
		className: styles["pink-stars"],
		key: "pink-stars",
		src: pinkStars,
	},
	{
		className: styles["cat"],
		key: "cat",
		src: cat,
	},
];

const Hero: React.FC = () => {
	const renderDecorativeImages = (): React.ReactNode =>
		decorativeImages.map((image) => (
			<DecorativeImage
				className={getClassNames(styles["floating-image"], image.className)}
				key={image.key}
				src={image.src}
			/>
		));

	return (
		<section className={getClassNames(styles["hero"], "grid-pattern")}>
			<div className={getClassNames(styles["container"], "wrapper flow-loose")}>
				<div className={getClassNames(styles["text-wrapper"], "flow")}>
					<div className="flow-loose">
						<h1>Create a personal development plan in 2 minutes</h1>
						<p className={styles["hero-subtitle"]}>
							AI-powered checklist generator for your goals — from fitness to
							creativity
						</p>
					</div>
					<Link asButton to={AppRoute.ROOT}>
						Start
					</Link>
				</div>
				<div className={styles["icons-wrapper"]}>
					{renderDecorativeImages()}
				</div>
			</div>
		</section>
	);
};

export { Hero };
