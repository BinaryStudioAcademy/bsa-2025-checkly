const LIMIT = 6;
const EMPTY_RESPONSE = 0;
const SINGLE_PAGE = 1;

const FEEDBACKS_SWIPER_BREAKPOINTS = {
	480: {
		slidesPerView: "auto",
		spaceBetween: 20,
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

export { EMPTY_RESPONSE, FEEDBACKS_SWIPER_BREAKPOINTS, LIMIT, SINGLE_PAGE };
