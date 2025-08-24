import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { DecorativeImage } from "~/libs/components/decorative-image/decorative-image.js";
import { ElementTypes, KeyboardKeys, QuizIndexes } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type QuizCategoryCardProperties } from "~/libs/types/types.js";
import { formatCategoryTitle } from "~/modules/quiz-questions/libs/helpers/format-category-title.js";

import styles from "./styles.module.css";

const QuizCategoryCard: React.FC<QuizCategoryCardProperties> = ({
	category,
	color,
	icon,
	onSelect,
	selected,
}: QuizCategoryCardProperties): React.ReactElement => {
	const handleChange = useCallback((): void => {
		onSelect();
	}, [onSelect]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent): void => {
			if (
				event.key === KeyboardKeys.ENTER ||
				event.key === KeyboardKeys.SPACE
			) {
				event.preventDefault();
				onSelect();
			}
		},
		[onSelect],
	);

	return (
		<div
			aria-label={`Select ${formatCategoryTitle(category)} category`}
			aria-pressed={selected}
			className={getClassNames(
				"flow",
				styles["quiz-category-card"],
				styles[`quiz-category-card-${color}`],
				selected && styles["quiz-category-card-selected"],
			)}
			onClick={onSelect}
			onKeyDown={handleKeyDown}
			role={ElementTypes.BUTTON}
			tabIndex={QuizIndexes.ZERO_INDEX}
		>
			<div className={styles["quiz-category-card-image"]}>
				<DecorativeImage
					className={styles["quiz-category-card-icon"] || ""}
					src={icon}
				/>
			</div>
			<h2 className={styles["quiz-category-card-title"]}>
				{formatCategoryTitle(category)}
			</h2>
			<input
				checked={selected}
				className={styles["quiz-category-card-input"]}
				id={`quiz-category-${category}`}
				name="quiz-category"
				onChange={handleChange}
				type={ElementTypes.RADIO}
				value={category}
			/>
			{selected && (
				<div className={styles["quiz-category-card-tick"]}>
					<DecorativeImage src={logoIcon} />
				</div>
			)}
		</div>
	);
};

export { QuizCategoryCard };
