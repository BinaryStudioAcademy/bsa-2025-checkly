const DownloadError = {
	ELEMENT_NOT_FOUND: "Element with ID '#{id}' not found",
	UNKNOWN: "An unknown error occurred while downloading",
} as const;

const ImageContentType = {
	JPEG: "image/jpeg",
	PNG: "image/png",
} as const;

const ImageFormat = {
	JPG: "jpg",
	PNG: "png",
} as const;

const PAPER_IN_HALF = 2;

const PDF_DOWNLOAD_OPTIONS = {
	background: "#ffffff",
	format: "png" as const,
	pdfFormat: "a4" as const,
	pdfOrientation: "portrait" as const,
	quality: 1,
};

export {
	DownloadError,
	ImageContentType,
	ImageFormat,
	PAPER_IN_HALF,
	PDF_DOWNLOAD_OPTIONS,
};
