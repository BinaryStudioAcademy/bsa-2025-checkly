import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { Loader } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { feedbackApi } from "~/modules/feedbacks/feedbacks.js";
import {
	type FeedbackDto,
	type FeedbackServiceReturns,
} from "~/modules/feedbacks/feedbacks.js";
import {
	EMPTY_RESPONSE,
	LIMIT,
	SINGLE_PAGE,
} from "~/pages/home/lib/constants.js";

import styles from "../../styles.module.css";
import { FeedbackCard } from "../feedback-card/feedback-card.js";

type Properties = {
	onOpenModal: (type: "DELETE" | "EDIT", id: number) => () => void;
	reloadTrigger: number;
	user: null | { id: number; name: string };
};

const FeedbackList: FC<Properties> = ({ onOpenModal, reloadTrigger, user }) => {
	const [feedbacks, setFeedbacks] = useState<FeedbackDto[]>([]);
	const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(SINGLE_PAGE);
	const [totalFeedbacks, setTotalFeedbacks] = useState<number>(EMPTY_RESPONSE);

	const loaderReference = useRef<HTMLDivElement>(null);
	const containerReference = useRef<HTMLDivElement>(null);
	const filterNewFeedbackItems = useCallback(
		(
			previousFeedbacks: FeedbackDto[],
			fetchedItems: FeedbackDto[],
		): FeedbackDto[] => {
			return fetchedItems.filter(
				(item) => !previousFeedbacks.some((f) => f.id === item.id),
			);
		},
		[],
	);

	const fetchFeedbacks = useCallback(
		async (page: number, limit: number): Promise<void> => {
			if (page === SINGLE_PAGE) {
				setIsLoadingInitial(true);
			} else {
				setIsLoadingMore(true);
			}

			try {
				const fetchedData: FeedbackServiceReturns = await feedbackApi.findAll({
					limit,
					page,
				});

				setFeedbacks((previousFeedbacks) => {
					if (page === SINGLE_PAGE) {
						return fetchedData.items;
					}

					const newItems = filterNewFeedbackItems(
						previousFeedbacks,
						fetchedData.items,
					);

					return [...previousFeedbacks, ...newItems];
				});

				setTotalFeedbacks(fetchedData.total);
			} catch {
				toast.error("Failed to load feedbacks. Please try again later.");
			} finally {
				if (page === SINGLE_PAGE) {
					setIsLoadingInitial(false);
				} else {
					setIsLoadingMore(false);
				}
			}
		},
		[filterNewFeedbackItems],
	);

	useEffect(() => {
		void fetchFeedbacks(currentPage, LIMIT);
	}, [fetchFeedbacks, currentPage]);

	useEffect(() => {
		const currentLoader = loaderReference.current;
		const rootElement = containerReference.current;

		if (!currentLoader) {
			return;
		}

		const hasMoreData = feedbacks.length < totalFeedbacks;

		if (!hasMoreData || isLoadingMore || isLoadingInitial) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;

				if (entry && entry.isIntersecting) {
					setCurrentPage((previousPage) => previousPage + SINGLE_PAGE);
				}
			},
			{
				root: rootElement,
				rootMargin: "20px",
				threshold: 0,
			},
		);

		observer.observe(currentLoader);

		return (): void => {
			observer.unobserve(currentLoader);
		};
	}, [feedbacks.length, totalFeedbacks, isLoadingMore, isLoadingInitial]);

	useEffect(() => {
		if (reloadTrigger > EMPTY_RESPONSE) {
			void fetchFeedbacks(SINGLE_PAGE, LIMIT);
			setCurrentPage(SINGLE_PAGE);
		}
	}, [fetchFeedbacks, reloadTrigger]);

	if (isLoadingInitial) {
		return (
			<div className={styles["loader-container"]}>
				<Loader container="inline" size="large" />
			</div>
		);
	}

	if (feedbacks.length === EMPTY_RESPONSE) {
		return (
			<div className={styles["no-feedbacks-title"]}>
				There are no feedbacks yet.
			</div>
		);
	}

	return (
		<div
			className={getClassNames(styles["grid"], styles["feedbacks-list"])}
			ref={containerReference}
		>
			{feedbacks.map((item) => (
				<FeedbackCard
					key={item.id}
					onDeleteClick={onOpenModal("DELETE", item.id)}
					onEditClick={onOpenModal("EDIT", item.id)}
					text={item.text}
					user={item.user}
					userId={user?.id}
				/>
			))}
			{feedbacks.length > EMPTY_RESPONSE &&
				feedbacks.length < totalFeedbacks && (
					<div
						className={styles["feedbacks-load-more-box"]}
						ref={loaderReference}
						style={{ flexShrink: 0, height: "20px", width: "20px" }}
					>
						{isLoadingMore && <Loader container="inline" size="large" />}
					</div>
				)}
		</div>
	);
};

export { FeedbackList };
