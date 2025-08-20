import { type ValueOf } from "src/libs/types/types.js";

import { type PaperFormat } from "../enums/paper-format.enum.js";

type PaperFormatValue = ValueOf<typeof PaperFormat>;

export { type PaperFormatValue };
