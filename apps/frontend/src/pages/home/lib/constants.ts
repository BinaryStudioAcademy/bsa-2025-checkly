const LIMIT = 6;
const NO_ITEMS = 0;
const SINGLE_PAGE = 1;
const FOUR_SLIDES_TO_LOOP = 4;

const FEEDBACKS_SWIPER_BREAKPOINTS = {
	320: {
		slidesPerView: 1,
		spaceBetween: 8,
	},
	480: {
		slidesPerView: 1,
		spaceBetween: 12,
	},
	640: {
		slidesPerView: 2,
		spaceBetween: 16,
	},
	768: {
		slidesPerView: 3,
		spaceBetween: 20,
	},
	1024: {
		slidesPerView: 3,
		spaceBetween: 24,
	},
	1280: {
		slidesPerView: "auto",
		spaceBetween: 30,
	},
} as const;

const SWIPER_AUTOPLAY_OPTIONS = { delay: 5000, disableOnInteraction: false };

export {
	FEEDBACKS_SWIPER_BREAKPOINTS,
	FOUR_SLIDES_TO_LOOP,
	LIMIT,
	NO_ITEMS,
	SINGLE_PAGE,
	SWIPER_AUTOPLAY_OPTIONS,
};
