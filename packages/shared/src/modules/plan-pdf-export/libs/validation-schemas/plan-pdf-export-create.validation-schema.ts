import { z } from "zod";

import { PaperFormat } from "../enums/paper-format.enum.js";

const planPdfExportCreateSchema = z.object({
	format: z.nativeEnum(PaperFormat),
	height: z.number().int().positive().optional(),
	html: z.string(),
	width: z.number().int().positive().optional(),
});

export { planPdfExportCreateSchema };
