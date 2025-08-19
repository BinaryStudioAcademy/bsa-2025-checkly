import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { Download, Save } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions } from "~/modules/plans/plans.js";

import { Day, Task } from "./components/components.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const user = useAppSelector((state) => state.auth.user);

	const plan = useAppSelector((state) => state.plan.plan);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const userId = 2;

		const getPlan = async (): Promise<void> => {
			await dispatch(actions.getPlan(userId));
		};

		void getPlan();
	}, [dispatch]);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

	const handleTaskRegenerate = useCallback(
		(taskId: number) => {
			const planId = plan?.id;
			const dayId = plan?.days[selectedDay]?.id;

			if (!planId || !dayId) {
				toast("Missing planId or dayId");

				return;
			}

			void dispatch(actions.regenerateTask({ dayId, planId, taskId }));
		},
		[plan, selectedDay, dispatch],
	);

	const handleDayRegenerate = useCallback(
		(dayId: number) => {
			const planId = plan?.id;

			if (!planId) {
				toast("Missing planId");

				return;
			}

			void dispatch(actions.regeneratePlanDay({ dayId, planId }));
		},

		[plan, dispatch],
	);

	return (
		<div className={styles["plan"]}>
			<div className={styles["nav"]}>
				<p>Here’s your plan!</p>
				<Button
					className={getClassNames(styles["select-day"])}
					label={`Day ${String(selectedDay + ONE)}`}
					onClick={toggleSelect}
					variant="transparent"
				/>
			</div>
			<div className={styles["content"]}>
				<div className={styles["content__days-wrapper"]}>
					<div
						className={getClassNames(
							styles["content__days"],
							isSelectOpen ? styles["content__days__open"] : "",
						)}
					>
						{plan?.days.map((item, index) => (
							<Day
								index={index}
								isOpen={isSelectOpen}
								item={item}
								key={item.id}
								onRegenerate={handleDayRegenerate}
								selectedDay={selectedDay}
								setIsOpen={setIsSelectOpen}
								setSelectedDay={setSelectedDay}
							/>
						))}
					</div>
				</div>
				<div
					className={getClassNames(
						styles["content__tasks"],
						"cluster grid-pattern flow",
					)}
				>
					{plan?.days[selectedDay]?.tasks.map((item, index) => (
						<Task
							indexItem={index + ONE}
							item={item}
							key={index}
							onRegenerate={handleTaskRegenerate}
						/>
					))}
					<NavLink
						className={getClassNames(styles["nav-link"])}
						to={AppRoute.CHOOSE_STYLE}
					>
						<Button
							icon={<DecorativeImage src={Download} />}
							iconOnlySize="medium"
							label="Download PDF"
							size="large"
							type="button"
							variant="primary"
						/>
					</NavLink>
					{user && (
						<Button
							icon={<DecorativeImage src={Save} />}
							iconOnlySize="medium"
							label="Save to profile"
							size="large"
							type="button"
							variant="secondary"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export { Plan };
