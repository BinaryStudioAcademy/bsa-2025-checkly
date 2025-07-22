import clsx, { type ClassValue } from "clsx";

const cn = (...classes: ClassValue[]): string => {
	return clsx(classes);
};

export { cn };
