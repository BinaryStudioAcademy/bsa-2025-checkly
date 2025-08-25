import { type PaperFormatValue } from "./paper-format.type.js";

type ExportPlanPdfDto = {
	format: PaperFormatValue;
	html: string;
	planStyle?: string;
};

export { type ExportPlanPdfDto };
