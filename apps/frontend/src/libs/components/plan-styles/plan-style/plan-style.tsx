import {
	MAX_DAYS_PER_PAGE,
	MIN_INDEX,
	MIN_PAGE,
	MIN_STACK_PAGES,
	PLAN_NAME_DEFAULT,
} from "~/libs/constants/constants.js";
import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";
import {
	type PlanStyleOption,
	ViewOption,
	type ViewOptions,
} from "~/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import { PLAN } from "../mocks/plan-mocks.js";
import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
	page?: number;
	planTitle?: string;
	view?: ViewOptions;
};

const chunkDays = <T,>(items: T[], size: number): T[][] => {
	const chunks: T[][] = [];

	for (let index = 0; index < items.length; index += size) {
		chunks.push(items.slice(index, index + size));
	}

	return chunks;
};

const selectPagesToRender = (
	view: ViewOptions,
	page: number | undefined,
	allChunks: (typeof PLAN.days)[],
): (typeof PLAN.days)[] => {
	const hasValidPage = typeof page === "number" && page >= MIN_PAGE;

	if (view === ViewOption.DESKTOP || view === ViewOption.MOBILE) {
		if (!hasValidPage) {
			return allChunks;
		}

		const clampedIndex = Math.min(
			page - MIN_PAGE,
			Math.max(MIN_INDEX, allChunks.length - MIN_PAGE),
		);
		const selected = allChunks[clampedIndex] ?? [];

		return selected.length > MIN_INDEX ? [selected] : [];
	}

	if (view !== "regular") {
		return [PLAN.days];
	}

	if (!hasValidPage) {
		return [PLAN.days];
	}

	const clampedIndex = Math.min(
		page - MIN_PAGE,
		Math.max(MIN_INDEX, allChunks.length - MIN_PAGE),
	);
	const selected = allChunks[clampedIndex] ?? [];

	return selected.length > MIN_INDEX ? [selected] : [];
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	page,
	planTitle,
	view = ViewOption.REGULAR,
}: Properties) => {
	const plan = useAppSelector((state) => state.plan.plan);
	const finalTitle = planTitle ?? String(plan?.title ?? PLAN_NAME_DEFAULT);

	const containerClasses = getClassNames(
		styles["container"],
		styles[`${view}-view`],
		view === ViewOption.HOMEPAGE && styles[`${view}-container`],
		view === ViewOption.SELECTION && styles[`${view}-container`],
		view === ViewOption.DESKTOP && styles[`${view}-container`],
		view === ViewOption.MOBILE && styles[`${view}-container`],
		PlanStyleModules[inputStyle]["container"],
	);

	const planBodyClasses = getClassNames(
		styles["plan-body"],
		PlanStyleModules[inputStyle]["plan-body"],
	);

	const dayListClasses = getClassNames(
		styles["day-list"],
		PlanStyleModules[inputStyle]["day-list"],
		view === ViewOption.DESKTOP && styles["desktop-day-list"],
		view === ViewOption.MOBILE && styles["mobile-day-list"],
	);

	const allChunks = chunkDays(PLAN.days, MAX_DAYS_PER_PAGE);

	const pagesToRender = selectPagesToRender(view, page, allChunks);

	const content =
		pagesToRender.length === MIN_INDEX ? null : (
			<>
				{pagesToRender.map((daysChunk, index) => (
					<section
						className={containerClasses}
						data-plan-style={inputStyle}
						key={`plan-page-${String(index)}`}
					>
						<PlanHeader inputStyle={inputStyle} title={finalTitle} />
						<div className={planBodyClasses}>
							<ul className={dayListClasses} data-view={view}>
								{daysChunk.map((day) => {
									return (
										<Day
											dayNumber={day.dayNumber}
											firstDayDate={PLAN.createdAt as string}
											inputStyle={inputStyle}
											key={`${day.id}-p${String(index + MIN_PAGE)}`}
											tasks={day.tasks}
										/>
									);
								})}
								<Notes inputStyle={inputStyle} />
							</ul>
						</div>
					</section>
				))}
			</>
		);

	if (view === ViewOption.DESKTOP && pagesToRender.length >= MIN_STACK_PAGES) {
		return <div className={styles["pages-stack"]}>{content}</div>;
	}

	if (view === ViewOption.MOBILE && pagesToRender.length >= MIN_STACK_PAGES) {
		return <div className={styles["pages-stack"]}>{content}</div>;
	}

	return content;
};

export { PlanStyle };
