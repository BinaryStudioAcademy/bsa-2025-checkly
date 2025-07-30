import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

const Logo: React.FC = () => {
	return (
		<div className={getClassNames(styles["container"], "cluster")}>
			<img alt="Logo icon" src={logoIcon} />
			<h1>Checkly</h1>
		</div>
	);
};

export { Logo };
