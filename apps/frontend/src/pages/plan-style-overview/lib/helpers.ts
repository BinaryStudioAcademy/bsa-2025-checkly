import { template1Pdf } from "~/assets/img/plan-style-overview/plan-style-overview.img.js";
import { type CategoryId } from "~/libs/constants/constants.js";
import { MESSAGES } from "~/libs/constants/messages.constants.js";
import { PlanCategoryId } from "~/libs/enums/enums.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";

const PDF_FILENAME = "Plan #1.pdf";

const downloadPlanAsPdf = (categoryId: CategoryId): void => {
	try {
		if (categoryId !== PlanCategoryId.PDF) {
			notifications.error(
				`${MESSAGES.DOWNLOAD.NOT_AVAILABLE} ${categoryId.toUpperCase()}`,
			);

			return;
		}

		const link = document.createElement("a");
		link.href = template1Pdf;
		link.download = PDF_FILENAME;

		document.body.append(link);
		link.click();
		link.remove();

		notifications.success(MESSAGES.DOWNLOAD.SUCCESS);
	} catch {
		notifications.error(MESSAGES.DOWNLOAD.FAILED);
	}
};

export { downloadPlanAsPdf };
