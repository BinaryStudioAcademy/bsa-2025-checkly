import React, { useCallback, useMemo } from "react";

import {
	DownloadError,
	generatePdfFromElement,
} from "~/libs/helpers/helpers.js";
import { type DownloadOptions } from "~/libs/types/pdf.types.js";

type Properties = {
	children: React.ReactNode;
	fileName?: string;
	onDownloadError?: (error: Error) => void;
	options?: DownloadOptions;
	targetId: string;
};

const DownloadButton: React.FC<Properties> = ({
	children,
	fileName = "my-personal-plan",
	onDownloadError,
	options = {},
	targetId,
}) => {
	const defaultOptions = useMemo(
		(): Required<DownloadOptions> => ({
			background: "#ffffff",
			format: "png",
			pdfFormat: "a4",
			pdfOrientation: "portrait",
			pdfUnit: "mm",
			quality: 1,
			useCORS: true,
			...options,
		}),
		[options],
	);

	const handleDownload = useCallback(async (): Promise<void> => {
		try {
			await generatePdfFromElement(targetId, fileName, defaultOptions);
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error : new Error(DownloadError.UNKNOWN);
			onDownloadError?.(errorMessage);
		}
	}, [targetId, fileName, defaultOptions, onDownloadError]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent): void => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				void handleDownload();
			}
		},
		[handleDownload],
	);

	const handleClick = useCallback((): void => {
		void handleDownload();
	}, [handleDownload]);

	return (
		<div
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role="button"
			style={{ cursor: "pointer" }}
			tabIndex={0}
		>
			{children}
		</div>
	);
};

export { DownloadButton };
