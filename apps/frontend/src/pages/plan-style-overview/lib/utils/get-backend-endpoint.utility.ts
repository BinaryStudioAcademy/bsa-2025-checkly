import { PlanCategoryId, PlanPdfExportApiPath } from "~/libs/enums/enums.js";

function getBackendEndpoint(category: string): string {
	switch (category) {
		case PlanCategoryId.DESKTOP: {
			return PlanPdfExportApiPath.EXPORT_PDF_DESKTOP;
		}

		case PlanCategoryId.MOBILE: {
			return PlanPdfExportApiPath.EXPORT_PDF_MOBILE;
		}

		default: {
			return PlanPdfExportApiPath.EXPORT_PDF;
		}
	}
}

export { getBackendEndpoint };
