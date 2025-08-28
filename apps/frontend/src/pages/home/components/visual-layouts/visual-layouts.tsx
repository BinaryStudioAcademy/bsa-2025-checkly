import {
	StarsPink02,
	StarsYellow03,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { NOTES_PLAN_TEMPLATE } from "~/libs/components/plan-styles/mocks/plan-mocks.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type ViewOptions } from "~/libs/types/types.js";

import { layoutExamples } from "./libs/constants.js";
import styles from "./styles.module.css";

const PLAN_VIEW_OPTION: ViewOptions = "homepage";

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
								<PlanStyle
									inputStyle={example.planStyle}
									notes={NOTES_PLAN_TEMPLATE}
									view={PLAN_VIEW_OPTION}
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
