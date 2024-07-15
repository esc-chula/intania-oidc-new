"use server";

import { api } from "@/trpc/server";
import type { Student } from "@/types/student";

export async function updateStudent(student: Student): Promise<void> {
    await api.student.update(student as never);
}
