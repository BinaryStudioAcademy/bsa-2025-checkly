import {
	FeedbacksSection,
	Header,
	Hero,
	HowItWorks,
} from "./components/components.js";

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<HowItWorks />
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
				<FeedbacksSection />
			</main>
		</>
	);
};

export { Home };
