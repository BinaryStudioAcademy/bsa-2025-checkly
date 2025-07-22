import { type JSX } from "react";

import { cn } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type LoaderContainer = "fullscreen" | "inline";
type LoaderSize = "base" | "large" | "medium" | "small";
type LoaderTheme = "accent" | "brand" | "muted";

type Properties = {
	container?: LoaderContainer;
	size?: LoaderSize;
	theme?: LoaderTheme;
};

const Loader = ({
	container = "fullscreen",
	size = "base",
	theme = "brand",
}: Properties): JSX.Element => {
	return (
		<div className={cn(styles["loader"], styles[container])}>
			<div
				className={cn(styles["spinner"], styles[theme], styles[size])}
				role="status"
			>
				<span className="visually-hidden">Loading in progress...</span>
			</div>
		</div>
	);
};

export { Loader };
