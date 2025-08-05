import { Edit, Reload, Remove, Timer } from "~/assets/img/icons/icons.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	indexItem: number;
	item: {
		description: string;
		title: string;
	};
};

const Task: React.FC<Properties> = ({ indexItem, item }: Properties) => {
	return (
		<div
			className={getClassNames(
				styles["content__tasks-item"],
				styles[`color-${String(indexItem)}`],
			)}
			key={indexItem}
		>
			<h3>{indexItem}</h3>
			<div className={styles["description-wrapper"]}>
				<h5>{item.title}</h5>
				<p>{item.description}</p>
			</div>
			<div className={styles["item-actions"]}>
				<div className={styles["item-actions__time"]}>
					<img alt="" src={Timer} />
					<span>morning</span>
				</div>
				<div className={styles["item-actions_buttons-wrapper"]}>
					<button className={styles["item-actions_button"]}>
						<img alt="" src={Edit} />
					</button>
					<button className={styles["item-actions_button"]}>
						<img alt="" src={Reload} />
					</button>
					<button className={styles["item-actions_button"]}>
						<img alt="" src={Remove} />
					</button>
				</div>
			</div>
		</div>
	);
};

export { Task };
