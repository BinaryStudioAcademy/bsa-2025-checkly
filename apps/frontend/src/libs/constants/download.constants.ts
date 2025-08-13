import { PlanCategoryId } from "~/libs/enums/enums.js";

const DOWNLOAD_CONFIGS = {
	[PlanCategoryId.DESKTOP]: {
		cssClass: "desktop-export",
		fileExtension: "png",
		imageType: "image/png",
	},
	[PlanCategoryId.MOBILE]: {
		cssClass: "mobile-export",
		fileExtension: "png",
		imageType: "image/png",
	},
	[PlanCategoryId.PDF]: {
		cssClass: "pdf-export",
		fileExtension: "pdf",
		format: "a4",
		imageType: "image/png",
		orientation: "portrait",
		unit: "mm",
	},
} as const;

const CLONED_ELEMENT_POSITIONING = {
	hiddenPosition: "-9999px",
	hiddenZIndex: "-1",
	positionType: "absolute",
} as const;

const FILE_TYPES = {
	PDF: "pdf",
} as const;

const PDF_FILENAME_SUFFIX = ".pdf";

export {
	CLONED_ELEMENT_POSITIONING,
	DOWNLOAD_CONFIGS,
	FILE_TYPES,
	PDF_FILENAME_SUFFIX,
};
