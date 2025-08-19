import { yellowStars, yellowTwinkles } from "~/assets/img/shared/shared.img.js";
import { DecorativeImage, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const YELLOW_STARS_CLASSES = getClassNames(
	styles["image-position"],
	styles["yellow-stars"],
);

const YELLOW_TWINKLES_CLASSES = getClassNames(
	styles["image-position"],
	styles["yellow-twinkles"],
);

const NotFound: React.FC = () => {
	return (
		<main
			className={getClassNames(styles["container"], "cluster", "grid-pattern")}
		>
			<div className={getClassNames("cluster", "grid-pattern", styles["card"])}>
				<h1 className={styles["title"]}>404</h1>
				<h2 className={styles["subtitle"]}>Page Not Found</h2>
				<p className={styles["description"]}>
					Oops! We couldn&apos;t find the page you are looking for. <br />
					But don&apos;t worry — there&apos;s plenty more to explore!
				</p>
				<Link asButtonSize="large" asButtonVariant="primary" to={AppRoute.ROOT}>
					Back to Home
				</Link>
			</div>
			<DecorativeImage className={YELLOW_STARS_CLASSES} src={yellowStars} />
			<DecorativeImage
				className={YELLOW_TWINKLES_CLASSES}
				src={yellowTwinkles}
			/>
		</main>
	);
};

export { NotFound };
