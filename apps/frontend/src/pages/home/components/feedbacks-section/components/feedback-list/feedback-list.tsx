import { type FC, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "swiper/css";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperClass } from "swiper/types"; // Import SwiperClass for better type safety

import { Loader } from "~/libs/components/components.js";
import { feedbackApi } from "~/modules/feedbacks/feedbacks.js";
import {
	type FeedbackDto,
	type Pagination,
} from "~/modules/feedbacks/feedbacks.js";
import {
	EMPTY_RESPONSE,
	FEEDBACKS_SWIPER_BREAKPOINTS,
	LIMIT,
	SINGLE_PAGE,
	SWIPER_AUTOPLAY_OPTIONS,
	TWO_SLIDES,
} from "~/pages/home/lib/constants.js";

import { FeedbackLoaderContainer } from "../../feedback-loader-container/feedback-loader-container.js";
import styles from "../../styles.module.css";
import { FeedbackCard } from "../feedback-card/feedback-card.js";

type Properties = {
	onOpenModal: (type: "DELETE" | "EDIT", id: number) => () => void;
	reloadTrigger: number;
	user: null | User;
};

type User = {
	id: number;
	name: string;
};

const FeedbackList: FC<Properties> = ({ onOpenModal, reloadTrigger, user }) => {
	const [feedbacks, setFeedbacks] = useState<FeedbackDto[]>([]);
	const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(SINGLE_PAGE);
	const [totalFeedbacks, setTotalFeedbacks] = useState<number>(EMPTY_RESPONSE);

	const hasEnoughSlidesForLoop = feedbacks.length > TWO_SLIDES;

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
			const setLoading =
				page === SINGLE_PAGE ? setIsLoadingInitial : setIsLoadingMore;
			setLoading(true);

			try {
				const fetchedData: Pagination<FeedbackDto> = await feedbackApi.findAll({
					limit,
					page,
				});

				setFeedbacks((previousFeedbacks) => {
					if (page === SINGLE_PAGE) {
						setTotalFeedbacks(fetchedData.total);

						return fetchedData.items;
					}

					const newItems = filterNewFeedbackItems(
						previousFeedbacks,
						fetchedData.items,
					);

					return [...previousFeedbacks, ...newItems];
				});
			} catch {
				toast.error("Failed to load feedbacks. Please try again later.");
			} finally {
				setLoading(false);
			}
		},
		[filterNewFeedbackItems],
	);

	const handleSlideChange = useCallback(
		(swiper: SwiperClass) => {
			const threshold = 3;
			const { activeIndex } = swiper;
			const isNearingEnd = activeIndex >= feedbacks.length - threshold;
			const hasMoreData = feedbacks.length < totalFeedbacks;
			const isNotLoading = !isLoadingMore;

			if (isNearingEnd && hasMoreData && isNotLoading) {
				setCurrentPage((previousPage) => previousPage + SINGLE_PAGE);
			}
		},
		[feedbacks.length, totalFeedbacks, isLoadingMore],
	);

	useEffect(() => {
		if (currentPage !== SINGLE_PAGE || totalFeedbacks === EMPTY_RESPONSE) {
			void fetchFeedbacks(currentPage, LIMIT);
		}
	}, [fetchFeedbacks, currentPage, totalFeedbacks]);

	useEffect(() => {
		if (reloadTrigger > EMPTY_RESPONSE) {
			void fetchFeedbacks(SINGLE_PAGE, LIMIT);
			setCurrentPage(SINGLE_PAGE);
		}
	}, [fetchFeedbacks, reloadTrigger]);

	if (isLoadingInitial) {
		return <FeedbackLoaderContainer />;
	}

	if (feedbacks.length === EMPTY_RESPONSE) {
		return (
			<div className={styles["no-feedbacks-title"]}>
				There are no feedbacks yet.
			</div>
		);
	}

	return (
		<div className={styles["feedbacks-list-wrapper"]}>
			<Swiper
				autoplay={hasEnoughSlidesForLoop ? SWIPER_AUTOPLAY_OPTIONS : false}
				breakpoints={FEEDBACKS_SWIPER_BREAKPOINTS}
				className={styles["feedbacks-swiper"]}
				loop={hasEnoughSlidesForLoop}
				modules={[Autoplay, Navigation, Mousewheel]}
				mousewheel
				navigation
				onSlideChange={handleSlideChange}
				slidesPerView={1}
				spaceBetween={50}
			>
				{feedbacks.map((item) => (
					<SwiperSlide className={styles["custom-slide"]} key={item.id}>
						<FeedbackCard
							onDeleteClick={onOpenModal("DELETE", item.id)}
							onEditClick={onOpenModal("EDIT", item.id)}
							text={item.text}
							user={item.user}
							userId={user?.id}
						/>
					</SwiperSlide>
				))}
				{isLoadingMore && (
					<div className={styles["feedbacks-load-more-box"]}>
						<Loader container="inline" size="large" />
					</div>
				)}
			</Swiper>
		</div>
	);
};

export { FeedbackList };
