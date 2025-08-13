type DownloadOptions = {
	background?: string;
	format?: "jpg" | "png";
	pdfFormat?: "a3" | "a4" | "a5" | "legal" | "letter";
	pdfOrientation?: "landscape" | "portrait";
	pdfUnit?: "cm" | "in" | "mm" | "px";
	quality?: number;
	useCORS?: boolean;
};

export { type DownloadOptions };
