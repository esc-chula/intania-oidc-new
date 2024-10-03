import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";
import type { Department } from "@/types/misc";
import { type Student } from "@/types/student";
import FormComponent from "@/components/register/1-form";
import { grpc } from "@/server/grpc";
import { cookies } from "next/headers";

export default async function Page() {
    const jar = cookies();
    const sessionId = jar.get("sid")?.value;
    if (!sessionId) return redirect("/logout");

    const me = await grpc.account.me({
        sessionId,
    }).catch(_ => {
        redirect("/logout")
    });

    const miscData = await grpc.student.listStudentMapping({
        masks: ["departments"],
    });

    const departments = miscData.departments;

    return <FormComponent studentData={me.student} departments={departments} />;
}
