import { Link } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { Header } from "./components/components.js";
import styles from "./styles.module.css";

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<section
					className={getClassNames(styles["hero__section"], "grid-pattern")}
					data-section-variant
				>
					<div
						className={getClassNames(
							styles["hero__content"],
							"wrapper flow-loose",
						)}
					>
						<div className="flow-tight">
							<h1 className={styles["hero__title"]}>
								Create a personal
								<br /> development plan in 2 minutes
							</h1>
							<h4 className={styles["hero__subtitle"]}>
								AI-powered checklist generator for your goals — from fitness to
								creativity
							</h4>
						</div>
						<Link to="/test-page">
							<button className={styles["hero__button-start"]}>Start</button>
						</Link>
					</div>
				</section>
				<section className="grid-pattern" data-section-variant="brand">
					<div className="wrapper">
						<h2>How it works</h2>
					</div>
				</section>
				<section data-section-variant>
					<div className="wrapper">
						<h2>Categories</h2>
					</div>
				</section>
				<section className="grid-pattern" data-section-variant="dark">
					<div className="wrapper">
						<h2>Sample visual layouts</h2>
					</div>
				</section>
				<section data-section-variant>
					<div className="wrapper">
						<h2>Testimonials</h2>
					</div>
				</section>
			</main>
		</>
	);
};

export { Home };
