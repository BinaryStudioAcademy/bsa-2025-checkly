const ButtonLabels = {
	BACK: "BACK",
	NEXT: "NEXT",
	SKIP: "SKIP",
	SUBMIT: "SUBMIT",
} as const;

const ButtonVariants = {
	PRIMARY: "primary",
	SECONDARY: "secondary",
	TRANSPARENT: "transparent",
} as const;

const ButtonSizes = {
	LARGE: "large",
	SMALL: "small",
} as const;

export { ButtonLabels, ButtonSizes, ButtonVariants };
