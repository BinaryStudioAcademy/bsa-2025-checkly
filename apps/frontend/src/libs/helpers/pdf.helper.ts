import H2C from "html2canvas";
import jsPDF from "jspdf";

import { type DownloadOptions, type Html2CanvasFunction } from "~/libs/types/types.js";

import { DownloadError, ImageContentType, ImageFormat, PAPER_IN_HALF } from "../constants/constants.js";

const html2canvas = H2C as unknown as Html2CanvasFunction;

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
		scale: 3,
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

export { DownloadError } from "../constants/constants.js";
export { generatePdfFromElement };
