import {
	MAX_DAYS_PER_PAGE,
	MIN_INDEX,
	MIN_PAGE,
	MIN_STACK_PAGES,
} from "~/libs/constants/constants.js";
import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type PlanStyleOption, type ViewOptions } from "~/libs/types/types.js";

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

	if (view === "desktop" || view === "mobile") {
		if (hasValidPage) {
			const clampedIndex = Math.min(
				page - MIN_PAGE,
				Math.max(MIN_INDEX, allChunks.length - MIN_PAGE),
			);
			const selected = allChunks[clampedIndex] ?? [];

			return selected.length > MIN_INDEX ? [selected] : [];
		}

		return allChunks;
	}

	if (view === "regular") {
		if (hasValidPage) {
			const clampedIndex = Math.min(
				page - MIN_PAGE,
				Math.max(MIN_INDEX, allChunks.length - MIN_PAGE),
			);
			const selected = allChunks[clampedIndex] ?? [];

			return selected.length > MIN_INDEX ? [selected] : [];
		}

		return [PLAN.days];
	}

	return [PLAN.days];
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	page,
	planTitle = "Plan title",
	view = "regular",
}: Properties) => {
	const containerClasses = getClassNames(
		styles["container"],
		styles[`${view}-view`],
		view === "homepage" && styles[`${view}-container`],
		view === "selection" && styles[`${view}-container`],
		view === "desktop" && styles[`${view}-container`],
		view === "mobile" && styles[`${view}-container`],
		PlanStyleModules[inputStyle]["container"],
	);

	const planBodyClasses = getClassNames(
		styles["plan-body"],
		PlanStyleModules[inputStyle]["plan-body"],
	);

	const dayListClasses = getClassNames(
		styles["day-list"],
		PlanStyleModules[inputStyle]["day-list"],
		view === "desktop" && styles["desktop-day-list"],
		view === "mobile" && styles["mobile-day-list"],
	);

	const allChunks = chunkDays(PLAN.days, MAX_DAYS_PER_PAGE);

	const pagesToRender = selectPagesToRender(view, page, allChunks);

	const content =
		pagesToRender.length === MIN_INDEX ? null : (
			<>
				{pagesToRender.map((daysChunk, index) => (
					<section
						className={containerClasses}
						key={`plan-page-${String(index)}`}
					>
						<PlanHeader inputStyle={inputStyle} title={planTitle} />
						<div className={planBodyClasses}>
							<ul className={dayListClasses}>
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

	if (view === "desktop" && pagesToRender.length >= MIN_STACK_PAGES) {
		return <div className={styles["pages-stack"]}>{content}</div>;
	}

	if (view === "mobile" && pagesToRender.length >= MIN_STACK_PAGES) {
		return <div className={styles["pages-stack"]}>{content}</div>;
	}

	return content;
};

export { PlanStyle };
