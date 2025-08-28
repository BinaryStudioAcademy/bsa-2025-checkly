import { type FC, useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, Save } from "~/assets/img/icons/icons.js";
import {
	AppHeader,
	Button,
	DecorativeImage,
	Loader,
} from "~/libs/components/components.js";
import { ZERO } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getEditedTasks } from "~/libs/helpers/get-edited-tasks.js";
import { getClassNames, getPlanStyleName } from "~/libs/helpers/helpers.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
} from "~/libs/hooks/hooks.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import {
	type PlanDayDto,
	type PlanEditForm,
	type SelectedItemType,
} from "~/libs/types/types.js";
import { type PlanWithCategoryDto } from "~/modules/plans/libs/types/types.js";

import { actions as planActions } from "../../modules/plans/plans.js";
import { actions as tasksActions } from "../../modules/tasks/tasks.js";
import { DaysNav, EditingPanel, PlanPreview } from "./components/components.js";
import styles from "./styles.module.css";

const mapDaysToNavItems = (
	days: PlanDayDto[],
): { id: string; label: string }[] => {
	return days.map((day) => ({
		id: day.id.toString(),
		label: `Day ${String(day.dayNumber)}`,
	}));
};

const PlanEdit: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [selectedItem, setSelectedItem] = useState<SelectedItemType>(ZERO);

	const plan = useAppSelector(({ plan }) => plan.plan) as PlanWithCategoryDto;
	const planFormData: PlanEditForm = {
		days: plan.days,
		startDate: plan.createdAt as string,
		theme: getPlanStyleName(plan.styleId),
		title: plan.title,
	};
	const originTasks = plan.days.flatMap((day) => day.tasks);

	const { control, errors } = useAppForm<PlanEditForm>({
		defaultValues: planFormData,
	});

	const formValues = useWatch({
		control,
	}) as PlanEditForm;

	const planPreviewKey = JSON.stringify(formValues);

	const handleSelectItem = useCallback((item: SelectedItemType): void => {
		setSelectedItem(item);
	}, []);

	const handleSelectPreview = useCallback((): void => {
		handleSelectItem("preview");
	}, [handleSelectItem]);

	const handleSave = useCallback((): void => {
		void (async (): Promise<void> => {
			const allTasks = formValues.days.flatMap((day) => day.tasks);
			const editedTasks = getEditedTasks(originTasks, allTasks);

			await dispatch(tasksActions.updateTasks(editedTasks));
			await dispatch(planActions.findPlan(plan.id));

			notifications.success("Plan saved successfully");
			void navigate(AppRoute.OVERVIEW_PAGE);
		})();
	}, [dispatch, formValues.days, navigate, originTasks, plan.id]);

	const handleNavigateBack = useCallback((): void => {
		void navigate(AppRoute.OVERVIEW_PAGE);
	}, [navigate]);

	if (formValues.days.length === ZERO) {
		return <Loader />;
	}

	const isPreviewActiveOnMobile = selectedItem === "preview";

	const navItems = mapDaysToNavItems(formValues.days);

	return (
		<>
			<AppHeader />
			<main
				className={getClassNames(
					"cluster",
					"grid-pattern",
					styles["page-container"],
				)}
				style={{ overflowX: "hidden", position: "relative" }}
			>
				<nav className={getClassNames("cluster", styles["nav"])}>
					<Button
						className={getClassNames("button-small", styles["left-arrow"])}
						icon={<DecorativeImage src={ArrowLeft} />}
						isIconOnly
						label=""
						onClick={handleNavigateBack}
					/>
				</nav>

				<div
					className={getClassNames(
						styles["content-grid"],
						styles["content-grid-padding"],
						isPreviewActiveOnMobile && styles["preview-mode-mobile"],
					)}
				>
					<div className={styles["left-panel"]}>
						<DaysNav
							items={navItems}
							notesLabel="Notes"
							onSelectItem={handleSelectItem}
							onSelectPreview={handleSelectPreview}
							previewLabel="Preview"
							selectedItem={selectedItem}
							shouldShowNotes={!!formValues.notes?.trim()}
							shouldShowPreviewButton
						/>
					</div>

					<div className={styles["center-panel"]}>
						<EditingPanel
							control={control}
							errors={errors}
							selectedItem={selectedItem}
						/>
					</div>

					<div className={getClassNames("cluster", styles["right-panel"])}>
						<PlanPreview
							containerId="plan-for-download"
							days={formValues.days}
							firstDayDate={formValues.startDate}
							isForPrint={false}
							key={planPreviewKey}
							notes={formValues.notes}
							theme={formValues.theme}
							title={formValues.title}
						/>
					</div>
				</div>

				<footer className={getClassNames("cluster", styles["page-footer"])}>
					<Button
						icon={<DecorativeImage src={Save} />}
						iconOnlySize="medium"
						label="Save Plan"
						onClick={handleSave}
						size="small"
						type="button"
						variant="primary"
					/>
				</footer>
			</main>
		</>
	);
};

export { PlanEdit };
