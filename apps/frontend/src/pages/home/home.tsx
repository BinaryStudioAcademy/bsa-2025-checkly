import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { Header } from "./components/components.js";
import styles from "./styles.module.css";

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<section className={styles["hero__section"]}>
					<div
						className={getClassNames(
							styles["hero__content"],
							"wrapper flow-loose",
						)}
						data-section-variant="light"
					>
						<div className="flow-tight">
							<h2 className={styles["hero__title"]}>
								Create a personal
								<br /> development plan in 2 minutes
							</h2>
							<p className={styles["hero__subtitle"]}>
								AI-powered checklist generator for your goals — from fitness to
								creativity
							</p>
						</div>
						<button className={styles["hero__button-start"]}>Start</button>
					</div>
				</section>
				<section data-section-variant="brand">
					<div className="wrapper">
						<h2>How it works</h2>
					</div>
				</section>
				<section data-section-variant="light">
					<div className="wrapper">
						<h2>Categories</h2>
					</div>
				</section>
				<section data-section-variant="dark">
					<div className="wrapper">
						<h2>Sample visual layouts</h2>
					</div>
				</section>
				<section data-section-variant="light">
					<div className="wrapper">
						<h2>Testimonials</h2>
					</div>
				</section>
			</main>
		</>
	);
};

export { Home };
