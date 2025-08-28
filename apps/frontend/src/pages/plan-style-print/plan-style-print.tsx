import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { PlanStyle as PlanStyleEnum } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppSelector, useCallback } from "~/libs/hooks/hooks.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import {
	type PlanDaysTaskDto,
	type PlanStyleOption,
} from "~/libs/types/types.js";
import { CURRENT_PLAN_MESSAGES } from "~/modules/plans/libs/constants/plan.constants.js";
import { planApi } from "~/modules/plans/plans.js";

import { PRINT_STYLE_TEMPLATE } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

const injectPrintStyle = (): HTMLStyleElement => {
	const style = document.createElement("style");
	style.textContent = PRINT_STYLE_TEMPLATE;
	document.head.append(style);

	return style;
};

const PlanStylePrint: React.FC = () => {
	const [searchParameters] = useSearchParams();
	const styleFromUrl = searchParameters.get("style");
	const planIdFromUrl = searchParameters.get("planId");
	const planDataFromUrl = searchParameters.get("planData");
	const inputStyle: PlanStyleOption = styleFromUrl
		? (styleFromUrl as PlanStyleOption)
		: PlanStyleEnum.WITH_REMARKS;

	const planFromRedux = useAppSelector((state) => state.plan.plan);
	const [planData, setPlanData] = useState<null | PlanDaysTaskDto>(null);
	const injectedStyleReference = useRef<HTMLStyleElement | null>(null);

	const parsePlanDataFromUrl = useCallback((): null | PlanDaysTaskDto => {
		if (!planDataFromUrl) {
			return null;
		}

		try {
			return JSON.parse(decodeURIComponent(planDataFromUrl)) as PlanDaysTaskDto;
		} catch {
			notifications.error(CURRENT_PLAN_MESSAGES.FAILED_TO_FETCH_CURRENT_PLAN);

			return null;
		}
	}, [planDataFromUrl]);

	const fetchPlanData =
		useCallback(async (): Promise<null | PlanDaysTaskDto> => {
			const urlPlanData = parsePlanDataFromUrl();

			if (urlPlanData) {
				return urlPlanData;
			}

			if (planFromRedux) {
				return planFromRedux;
			}

			if (planIdFromUrl) {
				const plan = await planApi
					.findWithRelations(Number(planIdFromUrl))
					.catch(() => {
						notifications.error(
							CURRENT_PLAN_MESSAGES.FAILED_TO_FETCH_CURRENT_PLAN,
						);

						return null;
					});

				return plan;
			}

			return await planApi.getByUserId().catch(() => {
				notifications.error(CURRENT_PLAN_MESSAGES.FAILED_TO_FETCH_CURRENT_PLAN);

				return null;
			});
		}, [planFromRedux, planIdFromUrl, parsePlanDataFromUrl]);

	useEffect(() => {
		void fetchPlanData().then(setPlanData);
	}, [fetchPlanData]);

	useEffect(() => {
		if (injectedStyleReference.current) {
			injectedStyleReference.current.remove();
			injectedStyleReference.current = null;
		}

		if (inputStyle === PlanStyleEnum.WITH_REMARKS) {
			injectedStyleReference.current = injectPrintStyle();
		}

		return (): void => {
			if (injectedStyleReference.current) {
				injectedStyleReference.current.remove();
				injectedStyleReference.current = null;
			}
		};
	}, [inputStyle]);

	const containerClassName = getClassNames(
		styles["print-container"],
		inputStyle === PlanStyleEnum.WITH_REMARKS &&
			styles["print-container--with-remarks"],
	);

	return (
		<div className={containerClassName} id="print-container">
			<div className={styles["print-container__content"]}>
				<PlanStyle inputStyle={inputStyle} planData={planData} />
			</div>
		</div>
	);
};

export { PlanStylePrint };
