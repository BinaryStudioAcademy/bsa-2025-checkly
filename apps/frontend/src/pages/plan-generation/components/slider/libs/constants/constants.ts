const SlideTiming = {
	DURATION_MS: 500,
	INTERVAL_MS: 2000,
} as const;

const SlideIndexing = {
	INCREMENT: 1,
	START_INDEX: 0,
} as const;

export { SlideIndexing, SlideTiming };
