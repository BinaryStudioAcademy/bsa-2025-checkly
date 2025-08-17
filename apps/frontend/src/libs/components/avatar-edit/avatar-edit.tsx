import { useCallback, useRef, useState } from "react";

import {
	EditPhoto as EditPhotoIcon,
	Remove as RemoveAvatarIcon,
} from "~/assets/img/icons/icons.js";
import { AvatarDefault } from "~/assets/img/shared/avatars/avatars.img.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { type Nullable } from "~/libs/types/types.js";

import { buildAvatarEditHandlers } from "./handlers.js";
import styles from "./styles.module.css";

const AvatarEdit: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();
	const [preview, setPreview] = useState<Nullable<string>>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const fileInputReference = useRef<HTMLInputElement | null>(null);

	const { handleFileChange, handleRemove } = buildAvatarEditHandlers({
		dispatch,
		getUser: () => user,
		setIsLoading,
		setPreview,
	});

	const handleOpenFilePicker = useCallback((): void => {
		fileInputReference.current?.click();
	}, []);

	if (!user) {
		return;
	}

	const avatarDisplayed = preview ?? user.avatarUrl ?? AvatarDefault;

	return (
		<div className={styles["container"]}>
			<div className={styles["avatarWrapper"]}>
				<img
					alt="avatar"
					className={styles["avatarImage"]}
					src={avatarDisplayed}
				/>
				<button
					className={styles["changeButton"]}
					disabled={isLoading}
					onClick={handleOpenFilePicker}
					type="button"
				>
					<img
						alt="edit"
						className={styles["avatarEditIcon"]}
						src={EditPhotoIcon}
					/>
				</button>
				{(preview ?? user.avatarUrl) && (
					<button
						aria-label="Remove avatar"
						className={styles["removeButton"]}
						disabled={isLoading}
						onClick={handleRemove}
						type="button"
					>
						<img
							alt="remove"
							className={styles["removeIcon"]}
							src={RemoveAvatarIcon}
						/>
					</button>
				)}
				<input
					accept="image/png,image/jpeg"
					className={styles["hiddenInput"]}
					disabled={isLoading}
					onChange={handleFileChange}
					ref={fileInputReference}
					type="file"
				/>
			</div>
		</div>
	);
};

export { AvatarEdit };
