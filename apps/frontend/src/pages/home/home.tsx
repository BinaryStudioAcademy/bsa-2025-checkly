import {
	Categories,
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
				<Categories />
				<VisualLayouts />
				<FeedbacksSection />
			</main>
			<Footer />
		</>
	);
};

export { Home };
