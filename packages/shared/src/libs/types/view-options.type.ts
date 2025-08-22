const VIEW_OPTIONS = [
	"desktop",
	"homepage",
	"mobile",
	"regular",
	"selection",
] as const;

type ViewOptions = (typeof VIEW_OPTIONS)[number];

export { VIEW_OPTIONS, type ViewOptions };
