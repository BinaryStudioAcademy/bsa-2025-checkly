import { type FC } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const classMainContent = getClassNames(
	"grid-pattern",
	styles["light-background"],
	styles["mainContent"],
);

const Dashboard: FC = () => {
	return <main className={classMainContent} />;
};

export { Dashboard };
