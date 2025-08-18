import { type PaperFormat } from "../enums/paper-format.enum.js";

type PaperFormatType = (typeof PaperFormat)[keyof typeof PaperFormat];

export { type PaperFormatType };
