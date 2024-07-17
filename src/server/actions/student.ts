"use server";

import { api } from "@/trpc/server";
import { type Student } from "@/types/student";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginStudent(
    username: string,
    password: string,
): Promise<void> {
    const res = await api.student.login({ username, password });

    console.log(res);

    if (!res.success) {
        if (res.errors.length > 0) {
            throw new Error(res.errors[0]);
        }
        throw new Error("Something went wrong");
    }

    if (!res.data) {
        throw new Error("Invalid username or password");
    }

    const { sid, expiredAt } = res.data;

    const cookieStore = cookies();
    cookieStore.set("sid", sid, {
        expires: expiredAt,
        httpOnly: true,
    });

    return;
}

export async function logoutStudent(): Promise<void> {
    const cookieStore = cookies();
    cookieStore.delete("sid");

    redirect("/");
}

export async function updateStudent(student: Student): Promise<void> {
    await api.student.update({
        ...student,
    });

    revalidatePath("/register/onboarding");
}
