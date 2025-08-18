import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	Book,
	Croissant,
	CupCoffee,
	CupGreen,
	Drink,
	Greens,
	IceCream,
	Laptop,
	Phone,
	Teddy,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { actions as planActions } from "~/modules/plans/plans.js";
import { actions as quizActions } from "~/modules/quiz/quiz.js";
import { type QuizState } from "~/modules/quiz/slices/quiz.slice.js";
import { type QuizAnswersRequestDto, type QuizCategoryType } from "~/pages/plan-generation/libs/types/types.js";

import { ImageSlider } from "./components/slider/slider.js";
import { DEFAULT_QUIZ_STATE } from "./libs/constants/constants.js";
import { useProgress } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const slides = [
	Teddy,
	Book,
	Croissant,
	CupCoffee,
	CupGreen,
	Drink,
	Greens,
	IceCream,
	Laptop,
	Phone,
];

const PlanGeneration: React.FC = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.plan.dataStatus);

	const navigate = useNavigate();

	useEffect(() => {
		const generatePlan = async (): Promise<void> => {
			const stored = await storage.get(StorageKey.QUIZ_STATE);
			const quizState = stored
				? (JSON.parse(stored) as QuizState)
				: DEFAULT_QUIZ_STATE;

			const quizAnswers: QuizAnswersRequestDto = {
				answers: Object.values(quizState.answers),
				category: quizState.selectedCategory as QuizCategoryType,
				notes: quizState.notes,
			};

			await dispatch(planActions.generatePlan(quizAnswers));
		};

		void generatePlan();
	}, [dispatch]);

	const progress = useProgress({
		onComplete: (): void => {
			dispatch(quizActions.resetQuiz());
			void storage.drop(StorageKey.QUIZ_STATE);
			void navigate(AppRoute.PLAN);
		},
		status,
	});

	const containerClasses = getClassNames(
		styles["container"],
		"cluster",
		"grid-pattern",
	);

	return (
		<main className={containerClasses}>
			<ImageSlider slides={slides} />
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
