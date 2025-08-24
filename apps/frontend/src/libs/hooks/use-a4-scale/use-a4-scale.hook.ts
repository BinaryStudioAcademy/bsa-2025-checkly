import { useLayoutEffect, useRef, useState } from "react";

import { BASE_DIMENSIONS, ONE, ZERO } from "~/libs/constants/constants.js";

const calculateA4Scale = (rect: DOMRectReadOnly): number => {
	return Math.min(
		rect.width / BASE_DIMENSIONS.WIDTH,
		rect.height / BASE_DIMENSIONS.HEIGHT,
	);
};

function useA4Scale(): {
	readonly scale: number;
	readonly viewportReference: React.RefObject<HTMLDivElement | null>;
} {
	const viewportReference = useRef<HTMLDivElement | null>(null);
	const [scale, setScale] = useState<number>(ONE);

	useLayoutEffect(() => {
		const element = viewportReference.current;

		if (!element) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[ZERO];

			if (!entry) {
				return;
			}

			const newScale = calculateA4Scale(entry.contentRect);
			setScale(newScale);
		});

		resizeObserver.observe(element);

		return (): void => {
			resizeObserver.disconnect();
		};
	}, []);

	return { scale, viewportReference } as const;
}

export { useA4Scale };
