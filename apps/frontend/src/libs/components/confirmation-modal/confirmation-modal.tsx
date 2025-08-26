import React from "react";

import { Button } from "~/libs/components/components.js";
import { Modal } from "~/libs/components/modal/modal.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	isOpen: boolean;
	message?: string;
	onCancel: () => void;
	onConfirm: () => void;
	onDiscard: () => void;
	title?: string;
};

const ConfirmationModal: React.FC<Properties> = ({
	isOpen,
	message,
	onCancel,
	onConfirm,
	onDiscard,
	title = "Unsaved Changes",
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onCancel} title={title}>
			<div className={styles["confirmation-modal-content"]}>
				<p className={styles["confirmation-message"]}>{message}</p>
				<div className={styles["confirmation-actions"]}>
					<Button
						className={getClassNames(styles["modal-action-button"])}
						label="Discard Changes"
						onClick={onDiscard}
						variant="secondary"
					/>
					<Button
						className={getClassNames(styles["modal-action-button"])}
						label="Save Changes"
						onClick={onConfirm}
						variant="primary"
					/>
				</div>
			</div>
		</Modal>
	);
};

export { ConfirmationModal };
