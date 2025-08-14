import { type ChangeEvent } from "react";
import { UPLOAD_MAX_FILE_SIZE_BYTES } from "shared";

import { type useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const ALLOWED_TYPES = new Set<string>(["image/jpeg", "image/png"]);

type AppDispatch = ReturnType<typeof useAppDispatch>;

type Deps = {
	dispatch: AppDispatch;
	getUser: () => UserLike;
	setIsLoading: (value: boolean) => void;
	setPreview: (url: null | string) => void;
};

type Handlers = {
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handleRemove: () => void;
};

type UserLike = null | { avatarUrl?: null | string; id: number };

function buildAvatarEditHandlers({
	dispatch,
	getUser,
	setIsLoading,
	setPreview,
}: Deps): Handlers {
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
		void (async (): Promise<void> => {
			const { files } = event.target;
			const [file] = files ? [...files] : [];
			const user = getUser();

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
				setPreview(URL.createObjectURL(file));

				const updated = await dispatch(
					authActions.avatarUpload({ file, userId: user.id }),
				).unwrap();

				dispatch(authActions.setUser(updated));
			} catch {
				setPreview(null);
			} finally {
				setIsLoading(false);
			}
		})();
	};

	const handleRemove = (): void => {
		void (async (): Promise<void> => {
			const user = getUser();

			if (!user) {
				return;
			}

			setIsLoading(true);

			try {
				const updated = await dispatch(
					authActions.avatarRemove({ userId: user.id }),
				).unwrap();

				setPreview(null);
				dispatch(authActions.setUser(updated));
			} finally {
				setIsLoading(false);
			}
		})();
	};

	return { handleFileChange, handleRemove };
}

export { buildAvatarEditHandlers };
