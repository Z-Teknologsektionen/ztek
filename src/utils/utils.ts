import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Very fancy tailwind merge utility function
 * @param inputs - TailWind values as strings, arrays of strings, dictoinaries of strings and conditions, etc etc...
 * @returns a TailWind string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
