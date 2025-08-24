import styles from "./styles.module.css";

type Properties = {
	message: string;
	onGoToDashboard: () => void;
};

const ToastSuccess: React.FC<Properties> = ({
	message,
	onGoToDashboard,
}: Properties) => (
	<div className={styles["toast-success"]}>
		<span className={styles["toast-success-message"]}>{message}</span>
		<button
			className={styles["toast-success-button"]}
			onClick={onGoToDashboard}
			type="button"
		>
			Go to Dashboard
		</button>
	</div>
);

export { ToastSuccess };
