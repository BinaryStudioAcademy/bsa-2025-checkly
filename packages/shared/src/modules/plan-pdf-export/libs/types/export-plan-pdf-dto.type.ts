import { type WindowSize } from "../../../../libs/types/window-size.type.js";
import { type PaperFormatValue } from "./paper-format.type.js";

type ExportPlanPdfDto = {
	format: PaperFormatValue;
	html?: string;
	page?: number;
	planId?: number;
	planStyle?: string;
	title?: string;
	windowSize?: WindowSize;
};

export { type ExportPlanPdfDto };
