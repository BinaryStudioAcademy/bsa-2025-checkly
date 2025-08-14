import { useEffect, useState } from "react";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	FastTiming,
	LOADING_DURATION_MS,
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

const startFastProgressWithDelay = (
	delayMs: number,
	updateFunction: () => void,
	intervalMs: number,
): (() => void) => {
	let fastId: ReturnType<typeof setTimeout>;

	const delayId = setTimeout(() => {
		fastId = setInterval(updateFunction, intervalMs);
	}, delayMs);

	return () => {
		clearTimeout(delayId);
		clearInterval(fastId);
	};
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

		return startFastProgressWithDelay(
			LOADING_DURATION_MS,
			() => {
				setProgress(getFastProgressUpdate);
			},
			FastTiming.INTERVAL_MS,
		);
	}, [status]);

	useEffect(() => {
		if (progress === ProgressLimits.MAX) {
			onComplete();
		}
	}, [progress, onComplete]);

	return progress;
};

export { useProgress };
