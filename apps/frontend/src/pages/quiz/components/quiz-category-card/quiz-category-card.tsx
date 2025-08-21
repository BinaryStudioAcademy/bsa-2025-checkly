import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { DecorativeImage } from "~/libs/components/decorative-image/decorative-image.js";
import { ElementTypes, KeyboardKeys, QuizIndexes } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type QuizCategoryCardProperties } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const QuizCategoryCard: React.FC<QuizCategoryCardProperties> = ({
	categoryTitle,
	color,
	iconHref,
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
			aria-label={`Select ${categoryTitle} category`}
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
					src={iconHref}
				/>
			</div>
			<h2 className={styles["quiz-category-card-title"]}>{categoryTitle}</h2>
			<input
				checked={selected}
				className={styles["quiz-category-card-input"]}
				id={`quiz-category-${categoryTitle}`}
				name="quiz-category"
				onChange={handleChange}
				type={ElementTypes.RADIO}
				value={categoryTitle}
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
