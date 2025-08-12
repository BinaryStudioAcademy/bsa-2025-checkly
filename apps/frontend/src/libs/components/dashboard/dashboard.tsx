import { type FC } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const classMainContent = getClassNames(
	"grid-pattern",
	styles["light-background"],
	styles["content"],
);

const Dashboard: FC = () => {
	return <div className={classMainContent} />;
};

export { Dashboard };
