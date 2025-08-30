import { type ExportDataDto } from "~/modules/plan-calendar-export/libs/types/types.js";

const buildExportFilename = (
	date: string,
	exportData: ExportDataDto,
): string => {
	const duration = exportData.days.length;

	return `checkly-plan-${date}-${String(duration)}d.ics`;
};

export { buildExportFilename };
