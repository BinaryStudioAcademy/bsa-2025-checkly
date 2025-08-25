const ButtonLabels = {
	BACK: "BACK",
	BACK_TO_MAIN_PAGE: "BACK TO MAIN PAGE",
	BACK_TO_START_QUIZ_PAGE: "BACK TO START QUIZ PAGE",
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
