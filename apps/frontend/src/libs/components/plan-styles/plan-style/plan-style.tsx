import {
	MAX_DAYS_PER_PAGE,
	MIN_INDEX,
	MIN_PAGE,
	MIN_STACK_PAGES,
} from "~/libs/constants/constants.js";
import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanStyleOption,
	ViewOption,
	type ViewOptions,
} from "~/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import styles from "./styles.module.css";

const DATE_PART_INDEX = 0;

type Properties = {
	inputStyle: PlanStyleOption;
	page?: number;
	planData?: null | PlanDaysTaskDto;
	view?: ViewOptions;
};

const chunkDays = <T,>(items: T[], size: number): T[][] => {
	const chunks: T[][] = [];

	for (let index = 0; index < items.length; index += size) {
		chunks.push(items.slice(index, index + size));
	}

	return chunks;
};

const getSelectedChunk = (
	page: number,
	allChunks: PlanDayDto[][],
): PlanDayDto[][] => {
	const clampedIndex = Math.min(
		page - MIN_PAGE,
		Math.max(MIN_INDEX, allChunks.length - MIN_PAGE),
	);
	const selected = allChunks[clampedIndex] ?? [];

	return selected.length > MIN_INDEX ? [selected] : [];
};

const getRegularViewPages = (
	planData: null | PlanDaysTaskDto | undefined,
): PlanDayDto[][] => {
	return planData?.days ? [planData.days] : [];
};

type PageRenderContext = {
	allChunks: PlanDayDto[][];
	page: number | undefined;
	planData: null | PlanDaysTaskDto | undefined;
	view: ViewOptions;
};

const selectPagesToRender = (context: PageRenderContext): PlanDayDto[][] => {
	const { allChunks, page, planData, view } = context;
	const hasValidPage = typeof page === "number" && page >= MIN_PAGE;

	if (view === ViewOption.DESKTOP || view === ViewOption.MOBILE) {
		if (!hasValidPage) {
			return allChunks;
		}

		return getSelectedChunk(page, allChunks);
	}

	if (view === ViewOption.REGULAR || view === ViewOption.SELECTION) {
		return getRegularViewPages(planData);
	}

	return allChunks;
};

const PlanStyle: React.FC<Properties> = ({
	inputStyle,
	page,
	planData,
	view = ViewOption.REGULAR,
}: Properties) => {
	if (!planData?.days) {
		return null;
	}

	const finalTitle = planData.title;

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

	const allChunks = chunkDays(planData.days, MAX_DAYS_PER_PAGE);

	const pagesToRender = selectPagesToRender({
		allChunks,
		page,
		planData,
		view,
	});

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
											firstDayDate={
												new Date().toISOString().split("T")[DATE_PART_INDEX]
											}
											inputStyle={inputStyle}
											key={`${String(day.id)}-p${String(index + MIN_PAGE)}`}
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
