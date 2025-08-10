import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Teddy } from "~/assets/img/shared/illustrations/illustrations.img.js";
import { DecorativeImage } from "~/libs/components/components.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
import { actions as planActions } from "~/modules/plans/plans.js";

import {
	FAST_INCREMENT,
	FAST_INTERVAL_MS,
	PROGRESS_MAX,
	PROGRESS_MAX_SLOW,
	PROGRESS_MIN,
	SLOW_INCREMENT_DIVISOR,
	SLOW_INCREMENT_MAX,
	SLOW_INTERVAL_MS,
} from "./libs/constants/constants.js";
import { type QuizAnswersDto } from "./libs/types/types.js";
import styles from "./styles.module.css";

const PlanGeneration: React.FC = () => {
	const [progress, setProgress] = useState<number>(PROGRESS_MIN);

	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.plan.dataStatus);

	const navigate = useNavigate();

	useEffect(() => {
		const stored = localStorage.getItem(StorageKey.QUIZ_ANSWER);
		const quizAnswers: QuizAnswersDto = stored
			? (JSON.parse(stored) as QuizAnswersDto)
			: [];

		void dispatch(planActions.generate(quizAnswers));

		const slowProgressId = setInterval(() => {
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

		return (): void => {
			clearInterval(slowProgressId);
		};
	}, [dispatch]);

	useEffect(() => {
		let fastProgressId: null | ReturnType<typeof setInterval> = null;

		if (status === DataStatus.FULFILLED) {
			fastProgressId = setInterval(() => {
				setProgress((previous) =>
					Math.min(previous + FAST_INCREMENT, PROGRESS_MAX),
				);
			}, FAST_INTERVAL_MS);
		}

		return (): void => {
			if (fastProgressId !== null) {
				clearInterval(fastProgressId);
			}
		};
	}, [status]);

	useEffect(() => {
		const redirect = async (): Promise<void> => {
			if (progress === PROGRESS_MAX) {
				await navigate(AppRoute.PLAN);
			}
		};

		void redirect();
	}, [progress, navigate]);

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
