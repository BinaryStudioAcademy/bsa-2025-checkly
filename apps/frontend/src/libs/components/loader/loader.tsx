import { type JSX } from "react";

import { cn } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type LoaderContainer = "fullscreen" | "inline";
type LoaderSize = "base" | "large" | "medium" | "small";
type LoaderTheme = "accent" | "brand" | "muted";

type Properties = {
	backdrop?: boolean;
	container?: LoaderContainer;
	size?: LoaderSize;
	theme?: LoaderTheme;
};

const Loader = ({
	container = "fullscreen",
	backdrop = container === "fullscreen",
	size = "large",
	theme = "brand",
}: Properties): JSX.Element => {
	const containerClasses = cn(styles["loader"], styles[container]);
	const spinnerClasses = cn(
		styles["spinner"],
		styles[size],
		styles[theme],
		backdrop && styles["backdrop"],
	);

	return (
		<div className={containerClasses}>
			<div className={spinnerClasses} role="status">
				<span className="visually-hidden">Loading in progress...</span>
			</div>
		</div>
	);
};

export { Loader };
