import { EyeOpenIcon } from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/components.js";

import { Header, Hero } from "./components/components.js";
import styles from "./styles.module.css";

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<div className="wrapper flow-loose" style={{ "paddingBlock": "2rem" }}>
					<div className="flow-loose">
						<h2>Buttons:</h2>
						<div className="flow-loose">
							<h4>Default size (large) - all variants</h4>
							<div className="cluster">
								<Button label="Primary Button" />
								<Button disabled label="Primary Disabled" />
							</div>
							<div className="cluster">
								<Button label="Secondary Button" variant="secondary" />
								<Button
									disabled
									label="Secondary Disabled"
									variant="secondary"
								/>
							</div>
							<div className="cluster">
								<Button label="Transparent Button" variant="transparent" />
								<Button
									disabled
									label="Transparent Disabled"
									variant="transparent"
								/>
							</div>
						</div>
						<div className="flow-loose">
							<h4>Small size with icons - all variants</h4>
							<div className="cluster">
								<Button
									icon={<EyeOpenIcon />}
									label="Primary Small"
									size="small"
								/>
								<Button
									disabled
									icon={<EyeOpenIcon />}
									label="Primary Small Disabled"
									size="small"
								/>
							</div>
							<div className="cluster">
								<Button
									icon={<EyeOpenIcon />}
									label="Secondary Small"
									size="small"
									variant="secondary"
								/>
								<Button
									disabled
									icon={<EyeOpenIcon />}
									label="Secondary Small Disabled"
									size="small"
									variant="secondary"
								/>
							</div>
							<div className="cluster">
								<Button
									icon={<EyeOpenIcon />}
									label="Transparent Small"
									size="small"
									variant="transparent"
								/>
								<Button
									disabled
									icon={<EyeOpenIcon />}
									label="Transparent Small Disabled"
									size="small"
									variant="transparent"
								/>
							</div>
						</div>
					</div>
				</div>
				<section className={styles["brand"]} data-section-variant>
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
