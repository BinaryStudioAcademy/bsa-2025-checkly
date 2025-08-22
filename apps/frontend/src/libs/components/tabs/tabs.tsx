import React, { useCallback, useState } from "react";

import { ZERO } from "~/libs/constants/constants.js";

import { getClassNames } from "../../helpers/get-class-names.js";
import styles from "./styles.module.css";
import { type Tab } from "./types/types.js";

type Properties = {
	defaultActiveTab?: string;
	tabs: Tab[];
};

const Tabs: React.FC<Properties> = ({ defaultActiveTab, tabs }) => {
	const [activeTab, setActiveTab] = useState<string>(
		defaultActiveTab ?? tabs[ZERO]?.id ?? "",
	);

	const handleTabClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const {
				dataset: { tabId },
			} = event.currentTarget;

			if (tabId) {
				setActiveTab(tabId);
			}
		},
		[],
	);

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
		</div>
	);
};

export { Tabs };
