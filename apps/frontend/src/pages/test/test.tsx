import { type ChangeEvent, useCallback, useState } from "react";
import { UPLOAD_MAX_FILE_SIZE_BYTES, UPLOAD_MAX_FILE_SIZE_MB } from "shared";
import { type UserDto } from "shared";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { userApi } from "~/modules/users/users.js";

import avatarDefault from "./avatar-default.png";

const DEFAULT_AVATAR = avatarDefault;
const ALLOWED_TYPES = new Set<string>(["image/jpeg", "image/png"]);

type Nullable<T> = null | T;

const Test: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();
	const [preview, setPreview] = useState<Nullable<string>>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null);

	const handleFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			void (async (): Promise<void> => {
				const { files } = event.target;
				const [file] = files ? [...files] : [];

				if (!file || !user) {
					return;
				}

				setErrorMessage(null);

				if (!ALLOWED_TYPES.has(file.type)) {
					setErrorMessage("Only PNG or JPEG allowed");

					return;
				}

				if (file.size > UPLOAD_MAX_FILE_SIZE_BYTES) {
					setErrorMessage(`Max ${String(UPLOAD_MAX_FILE_SIZE_MB)}MB`);

					return;
				}

				setIsLoading(true);

				try {
					const response = await userApi.uploadAvatar(user.id, file);
					const updated: UserDto =
						(await response.json()) as unknown as UserDto;
					setPreview(URL.createObjectURL(file));
					dispatch(authActions.setUser(updated));
				} catch {
					setErrorMessage("Upload failed");
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
			setErrorMessage(null);

			try {
				const response = await userApi.removeAvatar(user.id);
				const updated: UserDto = (await response.json()) as unknown as UserDto;
				setPreview(null);
				dispatch(authActions.setUser(updated));
			} catch {
				setErrorMessage("Remove failed");
			} finally {
				setIsLoading(false);
			}
		})();
	}, [dispatch, user]);

	if (!user) {
		return <div>Please sign in first.</div>;
	}

	const shown = preview ?? user.avatarUrl ?? DEFAULT_AVATAR;

	return (
		<div
			style={{ fontFamily: "sans-serif", margin: "2rem auto", maxWidth: 320 }}
		>
			<h2>Avatar demo</h2>
			<img
				alt="avatar"
				src={shown}
				style={{
					border: "1px solid #ccc",
					borderRadius: "50%",
					height: 140,
					objectFit: "cover",
					width: 140,
				}}
			/>
			<div style={{ marginTop: "1rem" }}>
				<input
					accept="image/png,image/jpeg"
					disabled={isLoading}
					onChange={handleFileChange}
					type="file"
				/>
			</div>
			{(preview ?? user.avatarUrl) && (
				<button
					disabled={isLoading}
					onClick={handleRemove}
					style={{ marginTop: "0.5rem" }}
				>
					Remove avatar
				</button>
			)}
			{isLoading && <div>Loading...</div>}
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</div>
	);
};

export { Test };
