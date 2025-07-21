import { type JSX } from "react";

type LoaderContainer = "fullscreen" | "inline";
type LoaderSize = "large" | "medium" | "small";
type LoaderTheme = "accent" | "brand" | "muted";

type Properties = {
	container?: LoaderContainer;
	size?: LoaderSize;
	theme?: LoaderTheme;
};

const Loader = ({
	container = "fullscreen",
	size = "large",
	theme = "brand",
}: Properties): JSX.Element => {
	return (
		<div className={`loader loader-${container}`}>
			<div
				className={`loader-spinner loader-${theme} loader-${size}`}
				role="status"
			>
				<span className="visually-hidden">Loading in progress...</span>
			</div>
		</div>
	);
};

export { Loader };
