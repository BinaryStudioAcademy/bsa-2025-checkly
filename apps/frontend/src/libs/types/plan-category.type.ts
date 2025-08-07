type CategoryId = "desktop" | "mobile" | "pdf";

type PlanCategory = {
	id: CategoryId;
	name: string;
};

type PlanPreviewProperties = {
	categoryType: CategoryId;
	description?: string;
	previewImage: string;
	templateId: string;
	title?: string;
};

export { type CategoryId, type PlanCategory, type PlanPreviewProperties };
