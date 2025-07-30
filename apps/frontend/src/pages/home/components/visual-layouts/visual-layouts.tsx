import {
	exampleColourful,
	exampleMinimal,
	exampleMotivating,
	exampleRemarks,
	pinkStars,
	yellowStars,
} from "~/assets/img/visual-layouts/visual-layouts.img.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const VisualLayouts: React.FC = () => {
	const layoutExamples = [
		{ id: 1, img: exampleRemarks, title: "With Remarks" },
		{ id: 2, img: exampleMinimal, title: "Minimal" },
		{ id: 3, img: exampleColourful, title: "Colourful" },
		{ id: 4, img: exampleMotivating, title: "Motivating" },
		{ id: 5, img: exampleRemarks, title: "With Remarks" },
		{ id: 6, img: exampleRemarks, title: "With Remarks" },
		{ id: 7, img: exampleMinimal, title: "Minimal" },
	];

	return (
		<section
			className={getClassNames("grid-pattern", styles["layout-examples"])}
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
							src={yellowStars}
						/>
					</h2>
					<img
						alt=""
						aria-hidden
						className={getClassNames(styles["pink-stars"])}
						src={pinkStars}
					/>
				</div>
				<div className={getClassNames(styles["layout-list"])}>
					{layoutExamples.map((example) => (
						<div
							className={getClassNames(styles["layout-card"])}
							key={example.id}
						>
							<img alt={example.title} src={example.img} />
							<h5>{example.title}</h5>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export { VisualLayouts };
