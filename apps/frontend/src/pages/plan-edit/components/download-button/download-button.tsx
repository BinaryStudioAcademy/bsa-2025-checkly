import H2C from "html2canvas";
import jsPDF from "jspdf";
import React, { useCallback, useMemo } from "react";

type Html2CanvasFunction = (
  element: HTMLElement,
  options?: object,
) => Promise<HTMLCanvasElement>;

const html2canvas = H2C as unknown as Html2CanvasFunction;

const PAPER_IN_HALF = 2;

type DownloadOptions = {
	background?: string;
	format?: "jpg" | "png";
	pdfFormat?: "a3" | "a4" | "a5" | "legal" | "letter";
	pdfOrientation?: "landscape" | "portrait";
	pdfUnit?: "cm" | "in" | "mm" | "px";
	quality?: number;
	useCORS?: boolean;
};

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
			const element = document.querySelector<HTMLElement>(`#${targetId}`);

			if (!element) {
				throw new Error(`Elemento com ID "${targetId}" não encontrado`);
			}

			const canvasOptions = {
				allowTaint: false,
				background: defaultOptions.background,
				logging: false,
				useCORS: defaultOptions.useCORS,
			};

			const canvas = await html2canvas(element, canvasOptions);

			const imgData =
				defaultOptions.format === "jpg"
					? canvas.toDataURL("image/jpeg", defaultOptions.quality)
					: canvas.toDataURL("image/png");

			const pdf = new jsPDF({
				format: defaultOptions.pdfFormat,
				orientation: defaultOptions.pdfOrientation,
				unit: defaultOptions.pdfUnit,
			});

			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();

			const imgWidth = canvas.width;
			const imgHeight = canvas.height;

			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

			const finalWidth = imgWidth * ratio;
			const finalHeight = imgHeight * ratio;

			const x = (pdfWidth - finalWidth) / PAPER_IN_HALF;
			const y = (pdfHeight - finalHeight) / PAPER_IN_HALF;

			pdf.addImage(
				imgData,
				defaultOptions.format.toUpperCase(),
				x,
				y,
				finalWidth,
				finalHeight,
			);
			pdf.save(`${fileName}.pdf`);
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error
					? error
					: new Error("Erro desconhecido ao fazer download");
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
