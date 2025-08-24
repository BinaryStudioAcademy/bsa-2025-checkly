import React from "react";

import {
	FileIcon,
	MonitorIcon,
	SmartphoneIcon,
} from "~/assets/img/icons/icons.js";
import { PlanCategoryId } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

type CategoryConfig = {
	icon: React.ReactElement;
	id: CategoryId;
	name: string;
};

type CategoryId = ValueOf<typeof PlanCategoryId>;

const PLAN_CATEGORIES: Record<CategoryId, CategoryConfig> = {
	[PlanCategoryId.DESKTOP]: {
		icon: <MonitorIcon />,
		id: PlanCategoryId.DESKTOP,
		name: "DESKTOP WALLPAPER",
	},
	[PlanCategoryId.MOBILE]: {
		icon: <SmartphoneIcon />,
		id: PlanCategoryId.MOBILE,
		name: "MOBILE WALLPAPER",
	},
	[PlanCategoryId.PDF]: {
		icon: <FileIcon />,
		id: PlanCategoryId.PDF,
		name: "PDF",
	},
} as const;

const getCategoryIcon = (categoryId: CategoryId): React.ReactElement => {
	return PLAN_CATEGORIES[categoryId].icon;
};

const getCategoryName = (categoryId: CategoryId): string => {
	return PLAN_CATEGORIES[categoryId].name;
};

const getCategoryShortName = (categoryId: CategoryId): string => {
	return PLAN_CATEGORIES[categoryId].id;
};

export {
	type CategoryId,
	getCategoryIcon,
	getCategoryName,
	getCategoryShortName,
};
