import { type FC } from "react";

import {
	Dog,
	OrangeWhole,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import {
	StarsPink02,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const FeedbackSectionDecoration: FC = () => {
	return (
		<>
			<DecorativeImage
				className={getClassNames(styles["decorStarsTop"])}
				src={TwinklesYellow}
			/>
			<DecorativeImage
				className={getClassNames(styles["orangeDecor"])}
				src={OrangeWhole}
			/>
			<div className={getClassNames(styles["dogImage"], "show-tablet-up")}>
				<DecorativeImage
					className={getClassNames(styles["pinkStars"])}
					src={StarsPink02}
				/>
				<DecorativeImage
					className={getClassNames(styles["dogImageInner"])}
					src={Dog}
				/>
			</div>
		</>
	);
};

export { FeedbackSectionDecoration };
