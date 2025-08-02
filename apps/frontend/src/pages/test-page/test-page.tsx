import { AppHeader } from "~/libs/components/components.js";

const TestPage: React.FC = () => {
	return (
		<>
			<AppHeader />
			<main style={{ paddingTop: 64 }}>
				<div style={{ margin: "0 auto", maxWidth: 800, padding: "2rem" }}>
					<section>
						<h1>AppHeader Test Page</h1>
						<p>
							This page exists only to test the AppHeader component and to avoid
							lint requirements.
						</p>
					</section>
				</div>
			</main>
		</>
	);
};

export { TestPage };
