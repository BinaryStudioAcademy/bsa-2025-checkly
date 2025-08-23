import { type WindowSize } from "../../../../libs/types/types.js";
import { type PaperFormatValue } from "./paper-format.type.js";

type ExportPlanPdfDto = {
	format?: PaperFormatValue;
	html: string;
	windowSize?: WindowSize;
};

export { type ExportPlanPdfDto };
