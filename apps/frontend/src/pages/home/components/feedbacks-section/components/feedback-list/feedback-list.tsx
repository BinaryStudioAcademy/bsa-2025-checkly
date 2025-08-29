import { type FC, useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperClass } from "swiper/types";

import { Loader } from "~/libs/components/components.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions, type UserPartialDto } from "~/modules/feedbacks/feedbacks.js";
import {
	FEEDBACKS_SWIPER_BREAKPOINTS,
	FOUR_SLIDES_TO_LOOP,
	LIMIT,
	NO_ITEMS,
	SINGLE_PAGE,
	SWIPER_AUTOPLAY_OPTIONS,
} from "~/pages/home/lib/constants.js";

import { FeedbackLoaderContainer } from "../../feedback-loader-container/feedback-loader-container.js";
import styles from "../../styles.module.css";
import { FeedbackCard } from "../feedback-card/feedback-card.js";

type Properties = {
	user: null | UserPartialDto;
};

const FeedbackList: FC<Properties> = ({ user }) => {
	const dispatch = useAppDispatch();
	const { dataStatus, feedbacks, total } = useAppSelector(
		(state) => state.feedbacks,
	);

	const [currentPage, setCurrentPage] = useState<number>(SINGLE_PAGE);
	const swiperReference = useRef<null | SwiperClass>(null);

	const isLoadingInitial =
		dataStatus === DataStatus.PENDING && currentPage === SINGLE_PAGE;
	const isLoadingMore =
		dataStatus === DataStatus.PENDING && currentPage > SINGLE_PAGE;
	const hasEnoughSlidesForLoop = feedbacks.length > FOUR_SLIDES_TO_LOOP;

	const handleSlideChange = useCallback(
		(swiper: SwiperClass) => {
			const threshold = 3;
			const { activeIndex } = swiper;
			const isNearingEnd = activeIndex >= feedbacks.length - threshold;
			const hasMoreData = feedbacks.length < total;
			const isNotLoading = dataStatus !== DataStatus.PENDING;

			if (isNearingEnd && hasMoreData && isNotLoading) {
				setCurrentPage((previousPage) => previousPage + SINGLE_PAGE);
			}
		},
		[feedbacks.length, total, dataStatus, setCurrentPage],
	);

	const handleSwiper = useCallback((swiper: SwiperClass) => {
		swiperReference.current = swiper;
	}, []);

	useEffect(() => {
		void dispatch(
			actions.fetchAllFeedbacks({
				limit: LIMIT,
				page: SINGLE_PAGE,
			}),
		);
	}, [dispatch]);

	useEffect(() => {
		if (currentPage > SINGLE_PAGE) {
			void dispatch(
				actions.fetchAllFeedbacks({
					limit: LIMIT,
					page: currentPage,
				}),
			);
		}
	}, [dispatch, currentPage]);

	if (isLoadingInitial) {
		return <FeedbackLoaderContainer />;
	}

	if (feedbacks.length === NO_ITEMS) {
		return (
			<div className={styles["no-feedbacks-title"]}>
				There are no feedbacks yet.
			</div>
		);
	}

	const autoplayTrigger = hasEnoughSlidesForLoop
		? {
				...SWIPER_AUTOPLAY_OPTIONS,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}
		: false;

	return (
		<div className={styles["feedbacks-list-wrapper"]}>
			<Swiper
				autoplay={autoplayTrigger}
				breakpoints={FEEDBACKS_SWIPER_BREAKPOINTS}
				className={styles["feedbacks-swiper"]}
				loop={hasEnoughSlidesForLoop}
				modules={[Autoplay, Navigation, Mousewheel]}
				mousewheel
				navigation
				onSlideChange={handleSlideChange}
				onSwiper={handleSwiper}
				slidesPerView={1}
				spaceBetween={20}
			>
				{feedbacks.map((item) => (
					<SwiperSlide
						className={styles["custom-slide"]}
						key={item.id}
						style={{ height: "auto" }}
					>
						<FeedbackCard text={item.text} user={item.user} userId={user?.id} />
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
