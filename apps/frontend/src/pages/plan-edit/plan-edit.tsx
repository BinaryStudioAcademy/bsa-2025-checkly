import { type FC, useCallback, useState } from "react";
import { useWatch } from "react-hook-form";

import { arrowLeft } from "~/assets/img/header/header.img.js";
import { Download } from "~/assets/img/icons/icons.js";
import { activitiesMockData } from "~/assets/mock-data/activities-data.mock.js";
import {
	AppHeader,
	Button,
	DaysNav,
	DecorativeImage,
	Loader,
	PlanPreview,
} from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm } from "~/libs/hooks/hooks.js";

import { EditingPanel } from "./components/components.js";
import { DownloadButton } from "./components/download-button/download-button.js";
import { type PlanEditForm } from "./libs/types/plan-edit-form.type.js";
import styles from "./styles.module.css";

const PlanEdit: FC = () => {
	const INITIAL_ITEM = 0;
	const DAY_INDEX = 1;

	const [selectedItem, setSelectedItem] = useState<
		"notes" | "preview" | number
	>(INITIAL_ITEM);

	const { control, errors } = useAppForm<PlanEditForm>({
		defaultValues: activitiesMockData,
	});

	const formValues = useWatch({
		control,
	}) as PlanEditForm;

	const planPreviewKey = JSON.stringify(formValues);

	const handleSelectItem = useCallback(
		(item: "notes" | "preview" | number): void => {
			setSelectedItem(item);
		},
		[],
	);

	const handleSelectPreview = useCallback((): void => {
		handleSelectItem("preview");
	}, [handleSelectItem]);

	if (formValues.days.length === INITIAL_ITEM) {
		return <Loader />;
	}

	const isPreviewActiveOnMobile = selectedItem === "preview";

	return (
		<>
			<AppHeader />
			<main
				className={getClassNames(
					"cluster",
					"grid-pattern",
					styles["page-container"],
				)}
			>
				<nav className={getClassNames("cluster", styles["nav"])}>
					<Button
						className={getClassNames("button-small", styles["left-arrow"])}
						icon={<DecorativeImage src={arrowLeft} />}
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
							items={formValues.days.map((_, index) => ({
								label: `Day ${String(index + DAY_INDEX)}`,
							}))}
							notesLabel="Notes"
							onSelectItem={handleSelectItem}
							onSelectPreview={handleSelectPreview}
							previewLabel="Preview"
							selectedItem={selectedItem}
							showNotes={Boolean(
								formValues.notes && formValues.notes.trim() !== "",
							)}
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

					<div className={styles["right-panel"]}>
						<PlanPreview
							containerId="plan-preview-for-download"
							days={formValues.days}
							key={planPreviewKey}
							notes={formValues.notes}
							theme="colourful" // This is the theme being applied hardcoded just for the moment
							title="My Personal Plan"
						/>
					</div>
				</div>

				<footer className={getClassNames("cluster", styles["page-footer"])}>
					<DownloadButton
						fileName="my-personal-plan"
						options={{
							background: "#ffffff",
							format: "png",
							pdfFormat: "a4",
							pdfOrientation: "portrait",
							quality: 1,
						}}
						targetId="plan-preview-for-download"
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
