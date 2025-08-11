import minimalDayStyles from "./day/day.module.css";
import minimalHeaderStyles from "./header/header.module.css";
import minimalStyles from "./styles.module.css";
import minimalTaskStyles from "./task/task.module.css";

Object.assign(
	minimalStyles,
	minimalDayStyles,
	minimalTaskStyles,
	minimalHeaderStyles,
);

export { default as minimalStyles } from "./styles.module.css";
