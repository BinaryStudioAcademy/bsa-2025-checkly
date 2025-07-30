/// <reference types="vite/client" />

declare module "*.svg?react" {
	const Component: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
	/* eslint-disable import/no-default-export */
	export default Component;
}
