import { Loader } from "~/libs/components/components.js";

import styles from "../styles.module.css";

const FeedbackLoaderContainer: React.FC = () => {
	return (
		<div className={styles["loader-container"]}>
			<Loader container="inline" size="large" />
		</div>
	);
};

export { FeedbackLoaderContainer };
