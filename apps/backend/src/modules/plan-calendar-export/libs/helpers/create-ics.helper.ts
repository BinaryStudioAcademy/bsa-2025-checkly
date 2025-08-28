import ical from "ical-generator";

import { ONE, ZERO } from "~/libs/constants/constants.js";
import { type ExportDataDto } from "~/modules/plan-calendar-export/libs/types/types.js";

const createCalendarIcs = (
	exportData: ExportDataDto,
	planId: number,
	planTitle: string,
): string => {
	const cal = ical({
		name: planTitle,
		timezone: "UTC",
	});

	const startDate = new Date(exportData.startDate);

	for (let dayIndex = 0; dayIndex < exportData.days.length; dayIndex++) {
		const dayObject = exportData.days[dayIndex];

		if (!dayObject) {
			continue;
		}

		const dayStart = new Date(startDate);
		dayStart.setUTCHours(ZERO, ZERO, ZERO, ZERO);
		dayStart.setDate(startDate.getDate() + dayIndex);

		const dayEnd = new Date(dayStart);
		dayEnd.setDate(dayStart.getDate() + ONE);

		let taskIndex = 0;

		for (const task of dayObject.tasks) {
			cal.createEvent({
				allDay: true,
				description: task.notes || undefined,
				end: dayEnd,
				start: dayStart,
				summary: `Day ${String(dayObject.day)} – ${String(taskIndex + ONE)}. ${task.title}`,
			});
			taskIndex++;
		}
	}

	return cal.toString();
};

export { createCalendarIcs };
