import { useLayoutEffect, useRef, useState } from "react";

import {
	BASE_HEIGHT,
	BASE_WIDTH,
	ONE,
	ZERO,
} from "~/libs/constants/constants.js";

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

		const resize = (rect: DOMRectReadOnly): void => {
			const size = Math.min(rect.width / BASE_WIDTH, rect.height / BASE_HEIGHT);
			setScale(size);
		};

		const resizeObserver = new ResizeObserver((entries) => {
			if (!entries[ZERO]) {
				return;
			}

			resize(entries[ZERO].contentRect);
		});

		resizeObserver.observe(element);

		return (): void => {
			resizeObserver.disconnect();
		};
	}, []);

	return { scale, viewportReference } as const;
}

export { useA4Scale };
