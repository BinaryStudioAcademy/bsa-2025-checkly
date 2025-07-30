/// <reference types="vite/client" />

declare module "*.svg?react" {
	import { type FunctionComponent, type SVGProps } from "react";

	const ReactComponent: FunctionComponent<
		SVGProps<SVGSVGElement> & { title?: string }
	>;
	export { ReactComponent };
}
