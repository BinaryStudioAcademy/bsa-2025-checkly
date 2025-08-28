import { type PaperFormatValue } from "./paper-format.type.js";

type ExportPlanPdfDto = {
	format: PaperFormatValue;
	html?: string;
	planId?: number;
	planStyle?: string;
};

export { type ExportPlanPdfDto };
