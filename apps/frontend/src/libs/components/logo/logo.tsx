import { Link } from "react-router-dom";

import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const Logo: React.FC = () => {
	return (
		<Link
			className={getClassNames("cluster", styles["container"])}
			to={AppRoute.ROOT}
		>
			<img alt="Binary Checkly web-application logo" src={logoIcon} />
			Checkly
		</Link>
	);
};

export { Logo };
