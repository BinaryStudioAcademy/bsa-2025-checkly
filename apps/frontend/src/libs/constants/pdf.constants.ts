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

export { DownloadError, ImageContentType, ImageFormat, PAPER_IN_HALF };