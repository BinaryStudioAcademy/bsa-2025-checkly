import { yellowStars, yellowTwinkles } from "~/assets/img/shared/shared.img.js";
import { Button, DecorativeImage, Link } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const yellowStarsClasses = getClassNames(
	styles["image-position"],
	styles["yellow-stars"],
);

const yellowTwinklesClasses = getClassNames(
	styles["image-position"],
	styles["yellow-twinkles"],
);

const NotFound: React.FC = () => {
	return (
		<>
			<main
				className={getClassNames(
					styles["container"],
					"cluster",
					"grid-pattern",
				)}
			>
				<div
					className={getClassNames(styles["card"], "cluster", "grid-pattern")}
				>
					<h1 className={styles["title"]}>404</h1>
					<h2 className={styles["subtitle"]}>Page Not Found</h2>
					<p className={styles["description"]}>
						Oops! We couldn&apos;t find the page you are looking for. <br />
						But don&apos;t worry — there&apos;s plenty more to explore!
					</p>
					<Link to={AppRoute.ROOT}>
						<Button label="Back to Home" size="large" variant="primary" />
					</Link>
				</div>
				<DecorativeImage
					className={yellowStarsClasses}
					src={yellowStars}
				/>
				<DecorativeImage
					className={yellowTwinklesClasses}
					src={yellowTwinkles}
				/>
			</main>
		</>
	);
};

export { NotFound };
