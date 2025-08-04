import {
	FeedbacksSection,
	Footer,
	Header,
	Hero,
	HowItWorks,
	VisualLayouts,
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
				<VisualLayouts />
				<FeedbacksSection />
			</main>
			<Footer />
		</>
	);
};

export { Home };
