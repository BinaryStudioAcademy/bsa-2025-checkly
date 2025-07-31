import { Categories, Header, Hero } from "./components/components.js";
import styles from "./styles.module.css";

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<section className={styles["brand"]} data-section-variant>
					<div className="wrapper">
						<h2>How it works</h2>
					</div>
				</section>
				<Categories />
				<section data-section-variant="dark">
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
