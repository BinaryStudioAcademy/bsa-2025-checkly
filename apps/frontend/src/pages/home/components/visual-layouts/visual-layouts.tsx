import {
	StarsPink02,
	StarsYellow03,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { layoutExamples } from "./layout-examples.data.js";
import styles from "./styles.module.css";

const VisualLayouts: React.FC = () => {
	return (
		<section
			className={getClassNames(
				"grid-pattern",
				styles["layout-examples"],
				styles["section"],
			)}
			data-section-variant="dark"
		>
			<div className={getClassNames("wrapper", styles["layout-wrapper"])}>
				<div className={getClassNames(styles["header-container"])}>
					<h2 className={getClassNames(styles["layout-header"])}>
						<span className={getClassNames(styles["header-text"])}>
							Sample visual layouts
						</span>
						<img
							alt=""
							aria-hidden
							className={getClassNames(styles["yellow-stars"])}
							src={StarsYellow03}
						/>
					</h2>
					<img
						alt=""
						aria-hidden
						className={getClassNames(styles["pink-stars"])}
						src={StarsPink02}
					/>
				</div>
				<div
					aria-label="Available layout options"
					className={getClassNames(styles["layout-list"])}
					role="list"
				>
					{layoutExamples.map((example) => (
						<div
							aria-label={`Visual layout option: ${example.title}`}
							className={getClassNames(styles["layout-card"])}
							key={example.id}
							role="listitem"
						>
							<img
								alt={`Preview of the ${example.title} layout`}
								src={example.img}
							/>
							<h5>{example.title}</h5>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export { VisualLayouts };
