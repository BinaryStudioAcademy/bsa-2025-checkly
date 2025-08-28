import { z } from "zod";

import { PaperFormat } from "../enums/paper-format.enum.js";

const planPdfExportCreateSchema = z.object({
	format: z.nativeEnum(PaperFormat),
	html: z.string().optional(),
	planId: z.number().optional(),
	planStyle: z.string().optional(),
});

export { planPdfExportCreateSchema };
