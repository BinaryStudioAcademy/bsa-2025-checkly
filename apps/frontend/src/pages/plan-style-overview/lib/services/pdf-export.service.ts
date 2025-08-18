import { ZERO } from "~/libs/constants/constants.js";
import { MESSAGES } from "~/libs/constants/messages.constants.js";
import {
	AppRoute,
	ContentType,
	FileExtension,
	HTTPRequestMethod,
	PaperFormat,
} from "~/libs/enums/enums.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { PAST_PLANS } from "~/pages/home/lib/constants.js";

import { downloadFile } from "../utils/download-file.utility.js";
import { getBackendEndpoint } from "../utils/get-backend-endpoint.utility.js";

async function downloadPlan(category: string): Promise<void> {
	try {
		const token = await storage.get(StorageKey.TOKEN);

		if (!token) {
			notifications.error(MESSAGES.AUTH.NOT_AUTHENTICATED);

			return;
		}

		const printPageUrl = AppRoute.PLAN_STYLE_PRINT;
		const backendEndpoint = getBackendEndpoint(category);

		if (!backendEndpoint) {
			notifications.info(
				`${MESSAGES.DOWNLOAD.NOT_AVAILABLE} ${String(category)}`,
			);

			return;
		}

		const responsePage = await fetch(printPageUrl);

		if (!responsePage.ok) {
			notifications.error(MESSAGES.DOWNLOAD.NO_PLAN_FOUND);

			return;
		}

		const format = PaperFormat.A4;
		const html = await responsePage.text();
		const apiUrl = import.meta.env["VITE_APP_API_ORIGIN_URL"] as string;

		const response = await fetch(`${apiUrl}${backendEndpoint}`, {
			body: JSON.stringify({ format, html }),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": ContentType.JSON,
			},
			method: HTTPRequestMethod.POST,
		});

		if (!response.ok) {
			notifications.error(MESSAGES.DOWNLOAD.FAILED);

			return;
		}

		const PDF_PLAN_INDEX = ZERO;
		const planName = String(PAST_PLANS[PDF_PLAN_INDEX].name);
		const fileName = `${planName}.${FileExtension.PDF}`;

		const blob = await response.blob();
		downloadFile(blob, fileName);
		notifications.success(MESSAGES.DOWNLOAD.SUCCESS);
	} catch {
		notifications.error(MESSAGES.DOWNLOAD.FAILED);
	}
}

export { downloadPlan };
