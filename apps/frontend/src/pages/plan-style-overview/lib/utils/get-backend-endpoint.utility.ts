import {
	APIPath,
	PlanCategoryId,
	PlanPdfExportApiPath,
} from "~/libs/enums/enums.js";

function getBackendEndpoint(category: string): null | string {
	if (category === PlanCategoryId.MOBILE) {
		return null;
	}

	if (category === PlanCategoryId.DESKTOP) {
		return null;
	}

	const endpoint = APIPath.PLAN_EXPORT_ROOT + PlanPdfExportApiPath.EXPORT_PDF;

	return endpoint;
}

export { getBackendEndpoint };
