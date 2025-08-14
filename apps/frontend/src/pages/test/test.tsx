import { type ChangeEvent, useCallback, useRef, useState } from "react";
import { UPLOAD_MAX_FILE_SIZE_BYTES, type UserDto } from "shared";

import { EditPhoto, Remove } from "~/assets/img/icons/icons.js";
import { AvatarDefault } from "~/assets/img/shared/avatars//avatars.img.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { userApi } from "~/modules/users/users.js";

import styles from "./styles.module.css";

const ALLOWED_TYPES = new Set<string>(["image/jpeg", "image/png"]);

type Nullable<T> = null | T;

const Test: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();
	const [preview, setPreview] = useState<Nullable<string>>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const fileInputReference = useRef<HTMLInputElement | null>(null);

	const handleOpenFilePicker = useCallback((): void => {
		fileInputReference.current?.click();
	}, []);

	const handleFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			void (async (): Promise<void> => {
				const { files } = event.target;
				const [file] = files ? [...files] : [];

				if (!file || !user) {
					return;
				}

				if (!ALLOWED_TYPES.has(file.type)) {
					return;
				}

				if (file.size > UPLOAD_MAX_FILE_SIZE_BYTES) {
					return;
				}

				setIsLoading(true);

				try {
					const response = await userApi.uploadAvatar(user.id, file);
					const updated: UserDto =
						(await response.json()) as unknown as UserDto;
					setPreview(URL.createObjectURL(file));
					dispatch(authActions.setUser(updated));
				} finally {
					setIsLoading(false);
				}
			})();
		},
		[dispatch, user],
	);

	const handleRemove = useCallback((): void => {
		void (async (): Promise<void> => {
			if (!user) {
				return;
			}

			setIsLoading(true);

			try {
				const response = await userApi.removeAvatar(user.id);
				const updated: UserDto = (await response.json()) as unknown as UserDto;
				setPreview(null);
				dispatch(authActions.setUser(updated));
			} finally {
				setIsLoading(false);
			}
		})();
	}, [dispatch, user]);

	if (!user) {
		return;
	}

	const shown = preview ?? user.avatarUrl ?? AvatarDefault;

	return (
		<div className={styles["container"]}>
			<div className={styles["avatarWrapper"]}>
				<img alt="avatar" className={styles["avatarImage"]} src={shown} />
				<button
					className={styles["changeButton"]}
					disabled={isLoading}
					onClick={handleOpenFilePicker}
					type="button"
				>
					<img
						alt="edit"
						className={styles["avatarEditIcon"]}
						src={EditPhoto}
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
						<img alt="remove" className={styles["removeIcon"]} src={Remove} />
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

export { Test };
