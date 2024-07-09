import Link from "next/link";

import { api } from "@/trpc/server";
import { cookies } from "next/headers";

export default async function Students() {
    const students = await api.student.getAll();
    const cookieStore = cookies();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                {students.map((x) => {
                    return <div>{x.email}</div>;
                })}
            </div>
        </main>
    );
}
