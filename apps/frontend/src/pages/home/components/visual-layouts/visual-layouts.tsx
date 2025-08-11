import {
	StarsPink02,
	StarsYellow03,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { layoutExamples } from "./libs/constants.js";
import styles from "./styles.module.css";

const VisualLayouts: React.FC = () => {
	return (
		<section
			className={getClassNames(
				"grid-pattern",
				styles["layout-examples"],
				styles["section"],
			)}
		>
			<div className={getClassNames("wrapper flow", styles["layout-wrapper"])}>
				<div className={styles["header-container"]}>
					<h2 className={styles["layout-header"]}>
						<span className={styles["header-text"]}>Sample visual layouts</span>
						<DecorativeImage
							className={getClassNames(styles["yellow-stars"])}
							src={StarsYellow03}
						/>
					</h2>
					<DecorativeImage
						className={getClassNames(styles["pink-stars"])}
						src={StarsPink02}
					/>
				</div>
				<div>
					<ul
						aria-label="Available layout options"
						className={styles["layout-list"]}
					>
						{layoutExamples.map((example) => (
							<li
								aria-label={`Visual layout option: ${example.title}`}
								className={styles["layout-card"]}
								key={example.id}
							>
								<img
									alt={`Preview of the ${example.title} layout`}
									src={example.img}
								/>
								<h5>{example.title}</h5>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export { VisualLayouts };
