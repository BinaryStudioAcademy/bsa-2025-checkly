type DownloadOptions = {
	background?: string;
	format?: "jpg" | "png";
	pdfFormat?: "a3" | "a4" | "a5" | "legal" | "letter";
	pdfOrientation?: "landscape" | "portrait";
	pdfUnit?: "cm" | "in" | "mm" | "pt" | "px";
	quality?: number;
	useCORS?: boolean;
};

type Html2CanvasFunction = (
	element: HTMLElement,
	options?: object,
) => Promise<HTMLCanvasElement>;

export { type DownloadOptions, type Html2CanvasFunction };
