import { DecorativeImage, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { decorativeImagesList } from "./libs/constants.js";
import styles from "./styles.module.css";

const Hero: React.FC = () => {
	const renderDecorativeImages = (): React.ReactNode =>
		decorativeImagesList.map((image) => (
			<DecorativeImage
				className={getClassNames(
					styles["floating-image"],
					styles[image.className],
				)}
				key={image.id}
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
					<Link asButtonVariant="primary" to={AppRoute.ROOT}>
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
