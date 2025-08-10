import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Teddy } from "~/assets/img/shared/illustrations/illustrations.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import {
	EMULATE_FULFILED_ON_PLAN_GENERATED_DELAY,
	FAST_INCREMENT,
	FAST_INTERVAL_MS,
	PROGRESS_MAX,
	PROGRESS_MAX_SLOW,
	PROGRESS_MIN,
	SLOW_INCREMENT_DIVISOR,
	SLOW_INCREMENT_MAX,
	SLOW_INTERVAL_MS,
} from "./libs/constants/constants.js";
import { type CleanupFunction } from "./libs/types/types.js";
import styles from "./styles.module.css";

const PlanGeneration: React.FC = () => {
	const [progress, setProgress] = useState<number>(PROGRESS_MIN);

	const navigate = useNavigate();

	const startSlowProgress = (): CleanupFunction => {
		const intervalId = setInterval(() => {
			setProgress((previous) => {
				if (previous >= PROGRESS_MAX_SLOW) {
					return previous;
				}

				const distance = PROGRESS_MAX_SLOW - previous;
				const increment = Math.max(
					SLOW_INCREMENT_MAX,
					distance / SLOW_INCREMENT_DIVISOR,
				);

				return previous + increment;
			});
		}, SLOW_INTERVAL_MS);

		return () => {
			clearInterval(intervalId);
		};
	};

	const startFastProgress = useCallback((): CleanupFunction => {
		const intervalId = setInterval(() => {
			setProgress((previous) => {
				if (previous >= PROGRESS_MAX) {
					// eslint-disable-next-line @typescript-eslint/no-floating-promises
					navigate(AppRoute.PLAN);

					return PROGRESS_MAX;
				}

				return Math.min(previous + FAST_INCREMENT, PROGRESS_MAX);
			});
		}, FAST_INTERVAL_MS);

		return () => {
			clearInterval(intervalId);
		};
	}, [navigate]);

	useEffect(() => {
		startSlowProgress();

		const timeoutId = setTimeout(() => {
			startFastProgress();
		}, EMULATE_FULFILED_ON_PLAN_GENERATED_DELAY);

		return (): void => {
			clearTimeout(timeoutId);
		};
	}, [navigate, startFastProgress]);

	const containerClasses = getClassNames(
		styles["container"],
		"cluster",
		"grid-pattern",
	);

	return (
		<main className={containerClasses}>
			<DecorativeImage src={Teddy} />
			<h1 className={styles["progress"]}>
				Analyzing{" "}
				<span className={styles["progress-number"]}>
					{Math.floor(progress)}%
				</span>
			</h1>
		</main>
	);
};

export { PlanGeneration };
