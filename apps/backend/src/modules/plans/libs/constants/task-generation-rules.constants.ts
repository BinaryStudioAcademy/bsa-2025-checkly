const TASK_GENERATION_RULES = {
	"Big Challenges": {
		"1-2h": {
			details: "3 substantial tasks of about 40 minutes each.",
			tasks: 3,
		},
		"10-15min": {
			details: "1 main task of about 15 minutes.",
			tasks: 1,
		},
		"20-30min": {
			details: "1 main task of about 30 minutes.",
			tasks: 1,
		},
		"45-60min": {
			details: "2 focused tasks of about 30 minutes each.",
			tasks: 2,
		},
		">2h": {
			details: "3 large tasks of about 45 minutes each.",
			tasks: 3,
		},
	},

	"Mix": {
		"1-2h": {
			details: "a mix of 4 tasks of 30 minutes each.",
			tasks: 4,
		},
		"10-15min": {
			details: "a mix of 3 quick tasks of 5 minutes each.",
			tasks: 3,
		},
		"20-30min": {
			details: "a mix of 3 tasks of 10 minutes each.",
			tasks: 3,
		},
		"45-60min": {
			details: "a mix of 3 tasks of 20 minutes each.",
			tasks: 3,
		},
		">2h": {
			details: "a mix of 4 tasks of 40 minutes each.",
			tasks: 4,
		},
	},

	"Small Steps": {
		"1-2h": {
			details: "5 small tasks of 20 minutes each.",
			tasks: 5,
		},
		"10-15min": {
			details: "3 small tasks of 5 minutes each.",
			tasks: 3,
		},
		"20-30min": {
			details: "4 small tasks of about 7.5 minutes each.",
			tasks: 4,
		},
		"45-60min": {
			details: "5 small tasks of 10 minutes each.",
			tasks: 5,
		},
		">2h": {
			details: "5 small tasks of 25 minutes each.",
			tasks: 5,
		},
	},
};

export { TASK_GENERATION_RULES };
