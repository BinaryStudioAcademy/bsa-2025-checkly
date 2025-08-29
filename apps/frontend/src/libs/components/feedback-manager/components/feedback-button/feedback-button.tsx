import { type FC, useCallback } from "react";
import { FiEdit3 } from "react-icons/fi";

import { Button } from "~/libs/components/components.js";
import menuItemStyles from "~/libs/components/navigation-item/styles.module.css";
import { ZERO } from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "../../styles.module.css";

type Properties = {
	handleOpenModal: (
		modalType: "CREATE" | "DELETE" | "EDIT",
		id?: number,
	) => void;
	type: "side-panel" | "user-menu";
};

const FeedbackButton: FC<Properties> = ({ handleOpenModal, type }) => {
	const handleButtonClick = useCallback(() => {
		handleOpenModal("CREATE");
	}, [handleOpenModal]);

	const menuItemClass = getClassNames(
		menuItemStyles["menu-item"],
		menuItemStyles["menu-item--user-menu"],
	);

	return (
		<>
			{type === "side-panel" ? (
				<div className={styles["add-feedback-thumb"]}>
					<Button
						className={styles["add-feedback-button"]}
						label="Give your feedback"
						onClick={handleButtonClick}
						size="small"
						type="button"
						variant="secondary"
					/>
				</div>
			) : (
				<li
					className={getClassNames(
						menuItemStyles["menu-item__link"],
						styles["menu-item--add-feedback"],
					)}
				>
					<button
						aria-label="Add feedback"
						className={menuItemClass}
						data-dropdown-button="true"
						onClick={handleButtonClick}
						role="menuitem"
						tabIndex={ZERO}
						type="button"
					>
						<FiEdit3 />
						Feedback
					</button>
				</li>
			)}
		</>
	);
};

export { FeedbackButton };
