import { api } from "@/trpc/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Me() {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid");
    if (!sid) {
        redirect("/login");
    }

    const me = await api.student.me();

    return (<>
        <div>
            id: {me?.studentId},
            email: {me?.email},
        </div>
    </>)
}
