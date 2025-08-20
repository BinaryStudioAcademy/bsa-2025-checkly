const MAX_FILENAME_LENGTH = 100;
const START_INDEX = 0;
const EXTENSION_OFFSET = 1;
const MIN_BASE_LENGTH = 1;
const DOT_NOT_FOUND = -1;

function sanitizeFilename(name: string): string {
	const trimmed = name.trim();
	const withoutPath = trimmed.replaceAll(/[/\\]+/g, "-");
	const lastDot = withoutPath.lastIndexOf(".");
	const hasDot = lastDot > DOT_NOT_FOUND;
	let base = hasDot ? withoutPath.slice(START_INDEX, lastDot) : withoutPath;
	let extension = hasDot ? withoutPath.slice(lastDot + EXTENSION_OFFSET) : "";

	base = base.normalize("NFKD").replaceAll(/[\u0300-\u036F]/g, "");
	extension = extension.normalize("NFKD").replaceAll(/[\u0300-\u036F]/g, "");

	base = base.replaceAll(/[^a-zA-Z0-9._-]+/g, "-");
	extension = extension.replaceAll(/[^a-zA-Z0-9]+/g, "");

	base = base.replaceAll(/[-_.]{2,}/g, "-");
	base = base.replaceAll(/^[-_.]+/g, "");

	while (base.endsWith("-") || base.endsWith("_") || base.endsWith(".")) {
		base = base.slice(START_INDEX, -EXTENSION_OFFSET);
	}

	if (!base) {
		base = "file";
	}

	const maxBaseLength = extension
		? Math.max(
				MIN_BASE_LENGTH,
				MAX_FILENAME_LENGTH - (extension.length + EXTENSION_OFFSET),
			)
		: MAX_FILENAME_LENGTH;

	if (base.length > maxBaseLength) {
		base = base.slice(START_INDEX, maxBaseLength);
	}

	return extension ? `${base}.${extension.toLowerCase()}` : base;
}

export { sanitizeFilename };
