import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function titleThToEn(titleTh: string): string {
    switch (titleTh) {
        case "นาย":
            return "Mr.";
        case "นาง":
            return "Mrs.";
        case "นางสาว":
            return "Miss";
        case "เด็กชาย":
            return "Master";
        case "เด็กหญิง":
            return "Miss";
        default:
            return titleTh;
    }
}
