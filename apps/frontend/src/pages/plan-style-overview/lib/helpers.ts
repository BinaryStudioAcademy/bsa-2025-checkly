import H2C from "html2canvas";
import jsPDF from "jspdf";

import styles from "~/libs/components/plan-display/styles.module.css";
import {
	CANVAS_CONFIG,
	type CategoryId,
	CLONED_ELEMENT_POSITIONING,
	DOWNLOAD_CONFIGS,
	FILE_TYPES,
	OVERFLOW_HIDDEN,
	PDF_FILENAME_SUFFIX,
	PLAN_PREVIEW_SELECTOR,
	ZERO,
} from "~/libs/constants/constants.js";
import { MESSAGES } from "~/libs/constants/messages.constants.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { PAST_PLANS } from "~/pages/home/lib/constants.js";

type Html2CanvasFunction = (
	element: HTMLElement,
	options?: object,
) => Promise<HTMLCanvasElement>;

const html2canvas = H2C as unknown as Html2CanvasFunction;

const PDF_PLAN_INDEX = ZERO;
const PDF_FILENAME = `${PAST_PLANS[PDF_PLAN_INDEX].name}${PDF_FILENAME_SUFFIX}`;

const downloadPlan = async (categoryId: CategoryId): Promise<void> => {
	try {
		const config = DOWNLOAD_CONFIGS[categoryId];

		const planElement = document.querySelector<HTMLElement>(
			PLAN_PREVIEW_SELECTOR,
		);

		if (!planElement) {
			notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

			return;
		}

		const exportClass = styles[config.cssClass];
		const originalOverflow = document.body.style.overflow;
		const originalPaddingRight = document.body.style.paddingRight;

		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;

		const clonedElement = planElement.cloneNode(true) as HTMLElement;
		clonedElement.style.position = CLONED_ELEMENT_POSITIONING.positionType;
		clonedElement.style.top = CLONED_ELEMENT_POSITIONING.hiddenPosition;
		clonedElement.style.left = CLONED_ELEMENT_POSITIONING.hiddenPosition;
		clonedElement.style.zIndex = CLONED_ELEMENT_POSITIONING.hiddenZIndex;

		try {
			document.body.style.paddingRight = `${scrollbarWidth.toString()}px`;
			document.body.style.overflow = OVERFLOW_HIDDEN;

			if (exportClass) {
				clonedElement.classList.add(exportClass);
			}

			document.body.append(clonedElement);

			const canvasOptions = {
				backgroundColor: CANVAS_CONFIG.backgroundColor,
				height: clonedElement.scrollHeight,
				logging: CANVAS_CONFIG.logging,
				scale: CANVAS_CONFIG.scale,
				useCORS: true,
				width: clonedElement.scrollWidth,
			};

			const canvas = await html2canvas(clonedElement, canvasOptions);

			const imgData = canvas.toDataURL(config.imageType);

			if (config.fileExtension === FILE_TYPES.PDF) {
				const pdf = new jsPDF({
					format: config.format,
					orientation: config.orientation,
					unit: config.unit,
				});

				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

				pdf.addImage(
					imgData,
					config.imageType,
					ZERO,
					ZERO,
					pdfWidth,
					pdfHeight,
				);
				pdf.save(PDF_FILENAME);
			} else {
				const link = document.createElement("a");
				link.download = `${PAST_PLANS[PDF_PLAN_INDEX].name}.${config.fileExtension}`;
				link.href = imgData;
				link.click();
			}

			notifications.success(MESSAGES.DOWNLOAD.SUCCESS);
		} finally {
			try {
				if (document.body.contains(clonedElement)) {
					clonedElement.remove();
				}

				document.body.style.overflow = originalOverflow;
				document.body.style.paddingRight = originalPaddingRight;
			} catch {
				notifications.error(MESSAGES.DOWNLOAD.CLEANUP_FAILED);
			}
		}
	} catch {
		notifications.error(MESSAGES.DOWNLOAD.FAILED);
	}
};

export { downloadPlan };
