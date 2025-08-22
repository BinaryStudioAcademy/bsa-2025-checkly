import { z } from "zod";

import { PaperFormat } from "../enums/paper-format.enum.js";

const planPdfExportCreateSchema = z.object({
	format: z.nativeEnum(PaperFormat),
	html: z.string(),
});

export { planPdfExportCreateSchema };
