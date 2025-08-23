import { Loader } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "../styles.module.css";

const FeedbackLoaderContainer: React.FC = () => {
	return (
		<div className={getClassNames("cluster", styles["loader-container"])}>
			<Loader container="inline" size="large" />
		</div>
	);
};

export { FeedbackLoaderContainer };
