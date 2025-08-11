import colorfulDayStyles from "./day/day.module.css";
import colorfulHeaderStyles from "./header/header.module.css";
import colorfulStyles from "./styles.module.css";
import colorfulTaskStyles from "./task/task.module.css";

Object.assign(
	colorfulStyles,
	colorfulDayStyles,
	colorfulTaskStyles,
	colorfulHeaderStyles,
);

export { default as colorfulStyles } from "./styles.module.css";
