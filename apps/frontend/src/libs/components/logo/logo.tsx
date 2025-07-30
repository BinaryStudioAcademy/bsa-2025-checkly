import { Link } from "react-router-dom";

import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const Logo: React.FC = () => {
	return (
		<Link className={getClassNames(styles["container"], "cluster")} to="/">
			<img alt="Binary Checkly web-application logo" src={logoIcon} />
			Checkly
		</Link>
	);
};

export { Logo };
