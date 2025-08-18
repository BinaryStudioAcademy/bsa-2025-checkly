import { z } from "zod";

import { PaperFormat } from "../enums/paper-format.enum.js";

const planPdfExportCreateSchema = z.object({
	format: z.enum([
		PaperFormat.A4,
		PaperFormat.Letter,
		PaperFormat.Legal,
		PaperFormat.Tabloid,
		PaperFormat.Ledger,
	]),
	html: z.string(),
});

export { planPdfExportCreateSchema };
