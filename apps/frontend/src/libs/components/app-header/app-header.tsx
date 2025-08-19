import React, { useCallback, useMemo, useRef, useState } from "react";

import { arrowDown } from "~/assets/img/header/header.img.js";
import { AvatarDefault } from "~/assets/img/shared/avatars/avatars.img.js";
import { Link, Logo } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import {
	useAppSelector,
	useDropdownMenu,
	useLocation,
} from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";
import { UserMenu } from "./user-menu.js";

const DEFAULT_USER_NAME = "User";

const AppHeader: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const menuReference = useRef<HTMLDivElement>(null);
	const user = useAppSelector((state) => state.auth.user);

	const { pathname } = useLocation();

	const hasDivider = (
		[AppRoute.DASHBOARD, AppRoute.PLAN, AppRoute.PROFILE] as string[]
	).includes(pathname);

	const displayName = useMemo(() => user?.name ?? DEFAULT_USER_NAME, [user]);

	const dispayAvatar = useMemo(() => user?.avatarUrl ?? AvatarDefault, [user]);

	const handleMenuToggle = useCallback((): void => {
		setIsMenuOpen((previous) => !previous);
	}, []);

	const handleMenuClose = useCallback((): void => {
		setIsMenuOpen(false);
	}, []);

	useDropdownMenu({
		isMenuOpen,
		menuReference,
		onClose: handleMenuClose,
	});

	const arrowClassName = useMemo(
		() =>
			getClassNames(
				styles["arrow-svg"],
				isMenuOpen && styles["arrow-svg--rotated"],
			),
		[isMenuOpen],
	);

	const burgerMenuClassName = useMemo(
		() =>
			getClassNames(
				styles["burger-menu"],
				isMenuOpen && styles["burger-menu--opened"],
			),
		[isMenuOpen],
	);

	return (
		<header className={styles["app-header"]}>
			<div className={styles["logo-section"]}>
				<Logo />
			</div>

			{hasDivider && <div className={styles["vertical-divider"]} />}

			<div className={styles["user-section"]} ref={menuReference}>
				{user && (
					<>
						<Link to={AppRoute.PROFILE}>
							<img
								alt="User profile"
								className={styles["user-image"]}
								src={dispayAvatar}
							/>
						</Link>
						<div className={styles["user-name-arrow"]}>
							<span className={styles["user-name"]}>{displayName}</span>
							<button
								aria-label="Open user menu"
								className={styles["arrow-button"]}
								onClick={handleMenuToggle}
								type="button"
							>
								<img
									alt="Open menu"
									className={arrowClassName}
									src={arrowDown}
								/>
							</button>
						</div>
						<button
							aria-label="Open user menu"
							className={burgerMenuClassName}
							onClick={handleMenuToggle}
							type="button"
						>
							<div className={styles["burger-menu__line"]} />
							<div className={styles["burger-menu__line"]} />
							<div className={styles["burger-menu__line"]} />
						</button>
					</>
				)}
				{isMenuOpen && <UserMenu isOpen />}
			</div>
		</header>
	);
};

export { AppHeader };