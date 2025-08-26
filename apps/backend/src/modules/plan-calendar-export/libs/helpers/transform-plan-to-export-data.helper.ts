import { type ExportDataDto } from "~/modules/plan-calendar-export/libs/types/types.js";
import { type PlanDaysTaskDto } from "~/modules/plans/plans.js";

const transformPlanToExportData = (
	plan: PlanDaysTaskDto,
	date: string,
): { exportData: ExportDataDto; planTitle: string } => {
	const planTitle = plan.title;

	const exportDays = plan.days.map((day) => ({
		day: day.dayNumber,
		tasks: day.tasks.map((task) => ({
			notes: task.description,
			title: task.title,
		})),
	}));

	return {
		exportData: {
			days: exportDays,
			durationDays: plan.duration as ExportDataDto["durationDays"],
			startDate: date,
		},
		planTitle,
	};
};

export { transformPlanToExportData };
