import {
	MAX_DAYS_PER_PAGE,
	MIN_INDEX,
	MIN_PAGE,
	MIN_STACK_PAGES,
	MOBILE_DAYS_PER_PAGE,
	ONE,
} from "~/libs/constants/constants.js";
import { PlanStyleModules } from "~/libs/enums/plan-style-modules.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	type PlanDayDto,
	type PlanStyleOption,
	ViewOption,
	type ViewOptions,
} from "~/libs/types/types.js";
import { type PlanWithCategoryDto } from "~/modules/plans/libs/types/types.js";

import { Day, Notes, PlanHeader } from "../components/components.js";
import { PLAN_TEMPLATE } from "../mocks/plan-mocks.js";
import styles from "./styles.module.css";

type Properties = {
	inputStyle: PlanStyleOption;
	notes?: string;
	page?: number;
	plan?: PlanWithCategoryDto;
	view?: ViewOptions;
};

type selectPagesToRenderArguments = {
	allChunks: PlanDayDto[][];
	page: number | undefined;
	plan: PlanWithCategoryDto;
	view: ViewOptions;
};

const chunkDays = <T,>(items: T[], size: number): T[][] => {
	const chunks: T[][] = [];

	for (let index = 0; index < items.length; index += size) {
		chunks.push(items.slice(index, index + size));
	}

	return chunks;
};

const selectPagesToRender = ({
	allChunks,
	page,
	plan,
	view,
}: selectPagesToRenderArguments): PlanDayDto[][] => {
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
		return [plan.days];
	}

	if (!hasValidPage) {
		return [plan.days];
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
	notes,
	page,
	plan = PLAN_TEMPLATE,
	view = ViewOption.REGULAR,
}: Properties) => {
	const planData = plan;
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

	const daysPerPage: number =
		view === ViewOption.MOBILE ? MOBILE_DAYS_PER_PAGE : MAX_DAYS_PER_PAGE;
	const allChunks = chunkDays(planData.days, daysPerPage);

	const pagesToRender = selectPagesToRender({
		allChunks,
		page,
		plan: planData,
		view,
	});

	const content =
		pagesToRender.length === MIN_INDEX ? null : (
			<>
				{pagesToRender.map((daysChunk, index) => {
					const showNotesOnThisPage =
						view === ViewOption.MOBILE
							? allChunks.indexOf(daysChunk) === allChunks.length - ONE
							: true;

					return (
						<section
							className={containerClasses}
							data-plan-style={inputStyle}
							key={`plan-page-${String(index)}`}
						>
							<PlanHeader inputStyle={inputStyle} title={planData.title} />
							<div className={planBodyClasses}>
								<ul className={dayListClasses} data-view={view}>
									{daysChunk.map((day) => {
										return (
											<Day
												dayNumber={day.dayNumber}
												firstDayDate={planData.createdAt}
												inputStyle={inputStyle}
												key={`${day.id.toString()}-p${String(index + MIN_PAGE)}`}
												tasks={day.tasks}
											/>
										);
									})}
									{showNotesOnThisPage && (
										<Notes inputStyle={inputStyle} notes={notes} />
									)}
								</ul>
							</div>
						</section>
					);
				})}
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
