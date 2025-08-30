const assignColor = (id: number, colorValues: string[]): string =>
	colorValues[id % colorValues.length] as string;

export { assignColor };
