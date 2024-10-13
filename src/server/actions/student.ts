"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginStudent as cLoginStudent } from "../controller/auth/login";
import { updateStudent as cUpdateStudent } from "../controller/auth/student";
import { type Student } from "@/generated/intania/auth/student/v1/student";

export async function loginStudent(formData: FormData): Promise<void> {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (!username || !password) {
        throw new Error("No username or password");
    }
    const res = await cLoginStudent(username, password);

    if (!res.success) {
        if (res.errors.length > 0) {
            throw new Error(res.errors[0]);
        }
        throw new Error("Something went wrong");
    }

    if (!res.data) {
        throw new Error("Invalid username or password");
    }

    const sid = res.data.session?.id;
    const expiredAt = res.data.session?.expiresAt;

    if (!sid) {
        throw new Error("Something went wrong");
    }

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
    const cookieStore = cookies();
    const sid = cookieStore.get("sid")?.value ?? "";

    await cUpdateStudent(sid, student);

    revalidatePath("/register/onboarding");
}
