const LIMIT = 6;
const NO_ITEMS = 0;
const SINGLE_PAGE = 1;
const TWO_SLIDES = 2;
const START_INDEX = 0;

const FEEDBACKS_SWIPER_BREAKPOINTS = {
	480: {
		slidesPerView: "auto",
		spaceBetween: 15,
	},
	640: {
		slidesPerView: "auto",
		spaceBetween: 20,
	},
	1024: {
		slidesPerView: "auto",
		spaceBetween: 30,
	},
} as const;

const SWIPER_AUTOPLAY_OPTIONS = { delay: 5000, disableOnInteraction: false };

export {
	FEEDBACKS_SWIPER_BREAKPOINTS,
	LIMIT,
	NO_ITEMS,
	SINGLE_PAGE,
	START_INDEX,
	SWIPER_AUTOPLAY_OPTIONS,
	TWO_SLIDES,
};
