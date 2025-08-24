import { type FC, useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import { toast } from "react-toastify";

import { ArrowLeft, Save } from "~/assets/img/icons/icons.js";
import { activitiesMockData } from "~/assets/mock-data/activities-data.mock.js";
import {
	AppHeader,
	Button,
	DecorativeImage,
	Loader,
} from "~/libs/components/components.js";
import { ZERO } from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	type PlanDay,
	type PlanEditForm,
	type SelectedItemType,
} from "~/libs/types/types.js";

import { DaysNav, EditingPanel, PlanPreview } from "./components/components.js";
import styles from "./styles.module.css";

const mapDaysToNavItems = (
	days: PlanDay[],
): { id: string; label: string }[] => {
	return days.map((day) => ({
		id: day.id,
		label: `Day ${String(day.dayNumber)}`,
	}));
};

const PlanEdit: FC = () => {
	const [selectedItem, setSelectedItem] = useState<SelectedItemType>(ZERO);

	const { control, errors } = useAppForm<PlanEditForm>({
		defaultValues: activitiesMockData,
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
		toast.success("Plan saved successfully");
	}, []);

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
							shouldShowNotes={!!formValues.notes.trim()}
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
