"use server"
import { api } from "@/trpc/server";

export async function fetchData() {
    try {
        const data = await api.student.getMiscInfo();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
    }
}