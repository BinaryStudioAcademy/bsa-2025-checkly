import React, { useCallback, useState } from "react";

import { ZERO } from "~/libs/constants/constants.js";

import { getClassNames } from "../../helpers/get-class-names.js";
import { ConfirmationModal } from "../components.js";
import styles from "../tabs/styles.module.css";
import { type Tab } from "../tabs/types/types.js";

type Properties = {
	defaultActiveTab?: string;
	onBeforeTabChange?: (
		currentTabId: string,
		nextTabId: string,
	) => boolean | Promise<boolean>;
	onSaveChanges?: (currentTabId: string) => Promise<void> | void;
	tabs: Tab[];
};

const Tabs: React.FC<Properties> = ({
	defaultActiveTab,
	onBeforeTabChange,
	onSaveChanges,
	tabs,
}) => {
	const [activeTab, setActiveTab] = useState<string>(
		defaultActiveTab ?? tabs[ZERO]?.id ?? "",
	);
	const [pendingTabId, setPendingTabId] = useState<null | string>(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

	const handleTabClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const {
				dataset: { tabId },
			} = event.currentTarget;

			if (!tabId || tabId === activeTab) {
				return;
			}

			if (onBeforeTabChange) {
				const canChange = onBeforeTabChange(activeTab, tabId);

				if (!canChange) {
					setPendingTabId(tabId);
					setIsConfirmationOpen(true);

					return;
				}
			}

			setActiveTab(tabId);
		},
		[activeTab, onBeforeTabChange],
	);

	const handleConfirmationCancel = useCallback(() => {
		setIsConfirmationOpen(false);
		setPendingTabId(null);
	}, []);

	const handleConfirmationDiscard = useCallback(() => {
		if (pendingTabId) {
			setActiveTab(pendingTabId);
		}

		setIsConfirmationOpen(false);
		setPendingTabId(null);
	}, [pendingTabId]);

	const handleConfirmationSave = useCallback(() => {
		if (onSaveChanges) {
			void onSaveChanges(activeTab);
		}

		if (pendingTabId) {
			setActiveTab(pendingTabId);
		}

		setIsConfirmationOpen(false);
		setPendingTabId(null);
	}, [activeTab, onSaveChanges, pendingTabId]);

	const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

	return (
		<div className={styles["tabs-container"]}>
			<div className={styles["tabs-header"]}>
				{tabs.map((tab) => (
					<button
						className={getClassNames(
							styles["tab-button"],
							activeTab === tab.id && styles["tab-button--active"],
						)}
						data-tab-id={tab.id}
						key={tab.id}
						onClick={handleTabClick}
						type="button"
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className={styles["tab-content"]}>{activeTabContent}</div>

			<ConfirmationModal
				isOpen={isConfirmationOpen}
				message="You have unsaved changes. What would you like to do?"
				onCancel={handleConfirmationCancel}
				onConfirm={handleConfirmationSave}
				onDiscard={handleConfirmationDiscard}
				title="Unsaved Changes"
			/>
		</div>
	);
};

export { Tabs };
