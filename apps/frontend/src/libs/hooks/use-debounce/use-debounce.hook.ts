import { useEffect, useState } from "react";

const DEBOUNCE_DELAY_DEFAULT = 500;

const useDebounce = <T>(value: T, delay = DEBOUNCE_DELAY_DEFAULT): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return (): void => {
			clearTimeout(timeoutId);
		};
	}, [value, delay]);

	return debouncedValue;
};

export { useDebounce };
