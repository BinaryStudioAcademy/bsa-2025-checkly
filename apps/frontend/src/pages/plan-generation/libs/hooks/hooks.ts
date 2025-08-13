import { useEffect, useState } from "react";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	FastTiming,
	ProgressLimits,
	SlowTiming,
} from "../constants/constants.js";

const getProgressStep = (currentProgress: number): number => {
	const distance = ProgressLimits.MAX_SLOW - currentProgress;

	return Math.max(
		SlowTiming.INCREMENT_MAX,
		distance / SlowTiming.INCREMENT_DIVISOR,
	);
};

const getUpdatedProgress = (previous: number): number => {
	if (previous >= ProgressLimits.MAX_SLOW) {
		return previous;
	}

	return previous + getProgressStep(previous);
};

const getFastProgressUpdate = (previous: number): number => {
	return Math.min(previous + FastTiming.INCREMENT, ProgressLimits.MAX);
};

type Properties = {
	onComplete: () => void;
	status: ValueOf<typeof DataStatus>;
};

const useProgress = ({ onComplete, status }: Properties): number => {
	const [progress, setProgress] = useState<number>(ProgressLimits.MIN);

	useEffect(() => {
		const slowId = setInterval(() => {
			setProgress(getUpdatedProgress);
		}, SlowTiming.INTERVAL_MS);

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
		}, FastTiming.INTERVAL_MS);

		return (): void => {
			clearInterval(fastId);
		};
	}, [status]);

	useEffect(() => {
		if (progress === ProgressLimits.MAX) {
			onComplete();
		}
	}, [progress, onComplete]);

	return progress;
};

export { useProgress };
