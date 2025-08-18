import { type PaperFormatType } from "./paper-format.type.js";

type ExportPlanPdfDto = {
	format: PaperFormatType;
	html: string;
};

export { type ExportPlanPdfDto };
