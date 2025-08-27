const ViewOption = {
	DESKTOP: "desktop",
	HOMEPAGE: "homepage",
	MOBILE: "mobile",
	REGULAR: "regular",
	SELECTION: "selection",
} as const;

type ViewOptions = (typeof ViewOption)[keyof typeof ViewOption];

export { ViewOption, type ViewOptions };
