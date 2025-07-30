import React, { useCallback, useMemo, useRef, useState } from "react";

import {
	arrowDown,
	logo,
	profileDefault,
} from "~/assets/img/header/header.img.js";
import { Link } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppSelector, useDropdownMenu } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";
import { UserMenu } from "./user-menu.js";

const AppHeader: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const menuReference = useRef<HTMLDivElement>(null);
	const user = useAppSelector((state) => state.auth.user);

	const displayName = useMemo(() => user?.name ?? "User", [user]);

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

	return (
		<header className={styles["app-header"]}>
			<div className={styles["logo-section"]}>
				<Link to="/">
					<img alt="Checkly logo" className={styles["logo-svg"]} src={logo} />
				</Link>
			</div>

			<div className={styles["user-section"]} ref={menuReference}>
				<img
					alt="User profile"
					className={styles["user-image"]}
					src={profileDefault}
				/>
				<div className={styles["user-name-arrow"]}>
					<span className={styles["user-name"]}>{displayName}</span>
					<button
						aria-label="Open user menu"
						className={styles["arrow-button"]}
						onClick={handleMenuToggle}
						type="button"
					>
						<img alt="Open menu" className={arrowClassName} src={arrowDown} />
					</button>
				</div>
				{isMenuOpen && <UserMenu isOpen />}
			</div>
		</header>
	);
};

export { AppHeader };
