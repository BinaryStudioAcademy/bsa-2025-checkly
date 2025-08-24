import {
	FileIcon,
	MonitorIcon,
	SmartphoneIcon,
} from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

const PlanStyleCategory: React.FC = () => {
	return (
		<div className={styles["header-buttons"]}>
			<Button
				className={styles["header-buttons-button"]}
				icon={<FileIcon aria-hidden="true" />}
				label="PDF"
				size="small"
			/>
			<Button
				className={styles["header-buttons-button"]}
				icon={<SmartphoneIcon aria-hidden="true" />}
				iconOnlySize="large"
				isDisabled
				label="Mobile Wallpaper"
				size="small"
			/>
			<Button
				className={styles["header-buttons-button"]}
				icon={<MonitorIcon aria-hidden="true" />}
				isDisabled
				label="Desktop Wallpaper"
				size="small"
			/>
		</div>
	);
};

export { PlanStyleCategory };
