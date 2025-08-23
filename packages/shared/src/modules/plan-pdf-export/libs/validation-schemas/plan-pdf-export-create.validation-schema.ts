import { z } from "zod";

import { PaperFormat } from "../enums/paper-format.enum.js";

const windowSizeSchema = z.object({
	height: z.number().int().positive(),
	pixelRatio: z.number().positive(),
	width: z.number().int().positive(),
});

const planPdfExportCreateSchema = z.object({
	format: z.nativeEnum(PaperFormat).optional(),
	html: z.string(),
	windowSize: windowSizeSchema.optional(),
});

export { planPdfExportCreateSchema };
