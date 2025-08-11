import withRemarksDayStyles from "./day/day.module.css";
import withRemarksHeaderStyles from "./header/header.module.css";
import withRemarksStyles from "./styles.module.css";
import withRemarksTaskStyles from "./task/task.module.css";

Object.assign(
	withRemarksStyles,
	withRemarksDayStyles,
	withRemarksTaskStyles,
	withRemarksHeaderStyles,
);

export { default as withRemarksStyles } from "./styles.module.css";
