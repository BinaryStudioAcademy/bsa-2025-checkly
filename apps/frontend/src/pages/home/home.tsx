import { getClassNames } from "~/libs/helpers/helpers.js";

import { FeedbacksSection, Header, Hero } from "./components/components.js";
import styles from "./styles.module.css";

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main className={styles["landing-page"]}>
				<Hero />
				<section
					className={getClassNames(styles["landing-section"], styles["brand"])}
					data-section-variant
				>
					<div className="wrapper">
						<h2>How it works</h2>
					</div>
				</section>
				<section
					className={getClassNames(styles["landing-section"])}
					data-section-variant
				>
					<div className="wrapper">
						<h2>Categories</h2>
					</div>
				</section>
				<section
					className={getClassNames("grid-pattern", styles["landing-section"])}
					data-section-variant="dark"
				>
					<div className="wrapper">
						<h2>Sample visual layouts</h2>
					</div>
				</section>
				<section
					className={getClassNames(
						"grid-pattern",
						styles["landing-section"],
						styles["light-background"],
					)}
				>
					<div className="wrapper">
						<FeedbacksSection />
					</div>
				</section>
			</main>
		</>
	);
};

export { Home };
