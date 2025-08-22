import { type PaperFormatValue } from "./paper-format.type.js";

type ExportPlanPdfDto = {
	format: PaperFormatValue;
	height?: number;
	html: string;
	width?: number;
};

export { type ExportPlanPdfDto };
