import { type FC, useCallback, useState } from "react";
import { useWatch } from "react-hook-form";

import { ArrowLeft, Download } from "~/assets/img/icons/icons.js";
import { activitiesMockData } from "~/assets/mock-data/activities-data.mock.js";
import {
	AppHeader,
	Button,
	DecorativeImage,
	Loader,
} from "~/libs/components/components.js";
import {
	INITIAL_ITEM,
	PDF_DOWNLOAD_OPTIONS,
} from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	type PlanDay,
	type PlanEditForm,
	type SelectedItemType,
} from "~/libs/types/types.js";

import {
	DaysNav,
	DownloadButton,
	EditingPanel,
	PlanPreview,
} from "./components/components.js";
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
	const [selectedItem, setSelectedItem] =
		useState<SelectedItemType>(INITIAL_ITEM);

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

	if (formValues.days.length === INITIAL_ITEM) {
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
							showNotes={!!formValues.notes.trim()}
							showPreviewButton
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
					<DownloadButton
						fileName="my-personal-plan"
						options={PDF_DOWNLOAD_OPTIONS}
						targetId="plan-for-download"
					>
						<Button
							icon={<DecorativeImage src={Download} />}
							iconOnlySize="medium"
							label="Download PDF"
							size="small"
							type="button"
							variant="primary"
						/>
					</DownloadButton>
				</footer>
			</main>
		</>
	);
};

export { PlanEdit };
