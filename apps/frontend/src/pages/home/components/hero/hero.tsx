import { DecorativeImage, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { DECORATIVE_IMAGES_LIST } from "./libs/constants.js";
import styles from "./styles.module.css";

const Hero: React.FC = () => {
	const renderDecorativeImages = (): React.ReactNode =>
		DECORATIVE_IMAGES_LIST.map((image) => (
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
			<div className={getClassNames("wrapper", styles["container"])}>
				<div className={getClassNames(styles["text-wrapper"], "cluster flow")}>
					<div className="cluster">
						<h1 className={styles["hero-title"]}>
							Create a personal development plan in 2 minutes
						</h1>
						<p className={styles["hero-subtitle"]}>
							AI-powered checklist generator for your goals — from fitness to
							creativity
						</p>
					</div>
					<Link
						asButtonSize="large"
						asButtonVariant="primary"
						to={AppRoute.TEST_PAGE}
					>
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
