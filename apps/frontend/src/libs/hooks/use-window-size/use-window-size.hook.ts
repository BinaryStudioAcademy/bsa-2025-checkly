import {
	DEFAULT_HEIGHT,
	DEFAULT_PIXEL_RATIO,
	DEFAULT_WIDTH,
} from "~/libs/constants/constants.js";
import { type WindowSize } from "~/libs/types/types.js";

const getSize = (): WindowSize => {
	const w = (globalThis as { window?: Window }).window;
	const screen = w?.screen;

	const height = screen?.height ?? DEFAULT_HEIGHT;
	const width = screen?.width ?? DEFAULT_WIDTH;
	const pixelRatio = w?.devicePixelRatio ?? DEFAULT_PIXEL_RATIO;

	return { height, pixelRatio, width };
};

function useWindowSize(): WindowSize {
	return getSize();
}

export { useWindowSize };
