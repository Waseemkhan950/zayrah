import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
// Convert Prisma object to regular JS object in TS
export function convertToPlainObject<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}
// format number with decimal places
// export function formatNumberWithDecimalPlaces(num: number): string {
// 	const [int, decimal] = num.toString().split(".");
// 	return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
// }
export function formatNumberWithDecimalPlaces(num: number): string {
	return num.toFixed(2);
}
// handling errors with zod
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
	// handling zod errors
	if (error.name === "ZodError") {
		const fieldErrors = Object.keys(error.errors).map((key) => {
			return {
				field: key,
				message: error.errors[key][0],
			};
		});
		return fieldErrors.join(". ");
	} else if (
		error.name === "PrismaClientKnownRequestError" &&
		error.code === "P2002"
	) {
		// handle unique constraint
		const field = error.meta?.target ? error.meta.target[0] : "";
		return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
	} else {
		// handle other errors
		return typeof error.message === "string"
			? error.message
			: JSON.stringify(error.message);
	}
}
// round number to two decimal places
export function round2(value: number | string) {
	if (typeof value === "number") {
		return Math.round((value + Number.EPSILON) * 100) / 100;
	} else if (typeof value === "string") {
		return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
	} else {
		throw new Error("value is not a number or a string");
	}
}
// currency formatter
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
});
// format currency using the formatter above
export function formatCurrency(value: number | string | null) {
	if (typeof value === "number") {
		return CURRENCY_FORMATTER.format(value);
	} else if (typeof value === "string") {
		return CURRENCY_FORMATTER.format(Number(value));
	} else {
		return "";
	}
}
// shorten UUID
export function formatUUID(id: string) {
	return `..${id.substring(id.length - 6)}`;
}
// Format date and time which which can return either date, time or both
export const formatDateTime = (dateString: Date) => {
	const dateTimeOptions: Intl.DateTimeFormatOptions = {
		month: "short", // abbreviated month name (e.g., 'Oct')
		year: "numeric", // abbreviated month name (e.g., 'Oct')
		day: "numeric", // numeric day of the month (e.g., '25')
		hour: "numeric", // numeric hour (e.g., '8')
		minute: "numeric", // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};
	const dateOptions: Intl.DateTimeFormatOptions = {
		weekday: "short", // abbreviated weekday name (e.g., 'Mon')
		month: "short", // abbreviated month name (e.g., 'Oct')
		year: "numeric", // numeric year (e.g., '2023')
		day: "numeric", // numeric day of the month (e.g., '25')
	};
	const timeOptions: Intl.DateTimeFormatOptions = {
		hour: "numeric", // numeric hour (e.g., '8')
		minute: "numeric", // numeric minute (e.g., '30')
		hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
	};
	const formattedDateTime: string = new Date(dateString).toLocaleString(
		"en-US",
		dateTimeOptions
	);
	const formattedDate: string = new Date(dateString).toLocaleString(
		"en-US",
		dateOptions
	);
	const formattedTime: string = new Date(dateString).toLocaleString(
		"en-US",
		timeOptions
	);
	return {
		dateTime: formattedDateTime,
		dateOnly: formattedDate,
		timeOnly: formattedTime,
	};
};
// form pagination links
export const formUrlQuery = ({
	params,
	key,
	value,
}: {
	params: string;
	key: string;
	value: string;
}) => {
	const query = qs.parse(params);
	query[key] = value;
	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query,
		},
		{
			skipNull: true,
		}
	);
};
// format Number
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
export function formatNumber(value: number) {
	return NUMBER_FORMATTER.format(value);
}
