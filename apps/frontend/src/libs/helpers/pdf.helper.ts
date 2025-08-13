import H2C from "html2canvas";
import jsPDF from "jspdf";

import { type DownloadOptions } from "~/libs/types/types.js";

type Html2CanvasFunction = (
	element: HTMLElement,
	options?: object,
) => Promise<HTMLCanvasElement>;

const html2canvas = H2C as unknown as Html2CanvasFunction;

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

const generatePdfFromElement = async (
	targetId: string,
	fileName: string,
	options: Required<DownloadOptions>,
): Promise<void> => {
	const element = document.querySelector<HTMLElement>(`#${targetId}`);

	if (!element) {
		throw new Error(DownloadError.ELEMENT_NOT_FOUND.replace("#{id}", targetId));
	}

	const canvas = await html2canvas(element, {
		allowTaint: false,
		background: options.background,
		logging: false,
		useCORS: options.useCORS,
	});

	const imgData =
		options.format === ImageFormat.JPG
			? canvas.toDataURL(ImageContentType.JPEG, options.quality)
			: canvas.toDataURL(ImageContentType.PNG);

	const pdf = new jsPDF({
		format: options.pdfFormat,
		orientation: options.pdfOrientation,
		unit: options.pdfUnit,
	});

	const pdfWidth = pdf.internal.pageSize.getWidth();
	const pdfHeight = pdf.internal.pageSize.getHeight();

	const imgWidth = canvas.width;
	const imgHeight = canvas.height;

	const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

	const finalWidth = imgWidth * ratio;
	const finalHeight = imgHeight * ratio;

	const x = (pdfWidth - finalWidth) / PAPER_IN_HALF;
	const y = (pdfHeight - finalHeight) / PAPER_IN_HALF;

	pdf.addImage(
		imgData,
		options.format.toUpperCase(),
		x,
		y,
		finalWidth,
		finalHeight,
	);
	pdf.save(`${fileName}.pdf`);
};

export { DownloadError, generatePdfFromElement };
