import { useCallback } from "react";

import { Edit, Regenerate, Remove, Timer } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import { type TaskDto } from "../../libs/types/types.js";
import styles from "../../shared/task/shared.module.css";

type Properties = {
	indexItem: number;
	item: TaskDto;
	onRegenerate: (index: number) => void;
};

const Task: React.FC<Properties> = ({
	indexItem,
	item,
	onRegenerate,
}: Properties) => {
	const handleRegenerate = useCallback(() => {
		onRegenerate(item.id);
	}, [item, onRegenerate]);

	return (
		<div
			className={getClassNames(
				styles["content__tasks-item"],
				"wrapper",
				styles[`color-${String(indexItem)}`],
			)}
		>
			<h3>{indexItem}</h3>
			<div className={styles["description-wrapper"]}>
				<h5>{item.title}</h5>
				<p>{item.description}</p>
			</div>
			<div className={styles["item-actions"]}>
				<div className={styles["item-actions__time"]}>
					<img alt="" src={Timer} />
					<span>{item.executionTimeType}</span>
				</div>
				<div className={styles["item-actions_buttons-wrapper"]}>
					<Button
						className={getClassNames(styles["item-actions_button"])}
						icon={<DecorativeImage src={Edit} />}
						isIconOnly
						label=""
					/>
					<Button
						className={getClassNames(styles["item-actions_button"])}
						icon={<DecorativeImage src={Regenerate} />}
						isIconOnly
						label=""
						onClick={handleRegenerate}
					/>
					<Button
						className={getClassNames(styles["item-actions_button"])}
						icon={<DecorativeImage src={Remove} />}
						isIconOnly
						label=""
					/>
				</div>
			</div>
		</div>
	);
};

export { Task };
