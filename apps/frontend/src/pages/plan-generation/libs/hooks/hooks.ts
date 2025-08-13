import { useEffect, useState } from "react";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	FAST_INCREMENT,
	FAST_INTERVAL_MS,
	PROGRESS_MAX,
	PROGRESS_MAX_SLOW,
	PROGRESS_MIN,
	SLOW_INCREMENT_DIVISOR,
	SLOW_INCREMENT_MAX,
	SLOW_INTERVAL_MS,
} from "../constants/constants.js";

const getProgressStep = (currentProgress: number): number => {
	const distance = PROGRESS_MAX_SLOW - currentProgress;

	return Math.max(SLOW_INCREMENT_MAX, distance / SLOW_INCREMENT_DIVISOR);
};

const getUpdatedProgress = (previous: number): number => {
	if (previous >= PROGRESS_MAX_SLOW) {
		return previous;
	}

	return previous + getProgressStep(previous);
};

const getFastProgressUpdate = (previous: number): number => {
	return Math.min(previous + FAST_INCREMENT, PROGRESS_MAX);
};

type Properties = {
	onComplete: () => void;
	status: ValueOf<typeof DataStatus>;
};

const useProgress = ({ onComplete, status }: Properties): number => {
	const [progress, setProgress] = useState<number>(PROGRESS_MIN);

	useEffect(() => {
		const slowId = setInterval(() => {
			setProgress(getUpdatedProgress);
		}, SLOW_INTERVAL_MS);

		return (): void => {
			clearInterval(slowId);
		};
	}, []);

	useEffect(() => {
		if (status !== DataStatus.FULFILLED) {
			return;
		}

		const fastId = setInterval(() => {
			setProgress(getFastProgressUpdate);
		}, FAST_INTERVAL_MS);

		return (): void => {
			clearInterval(fastId);
		};
	}, [status]);

	useEffect(() => {
		if (progress === PROGRESS_MAX) {
			onComplete();
		}
	}, [progress, onComplete]);

	return progress;
};

export { useProgress };
