import { api } from "@/trpc/server";
import FormComponent from "./_components/form";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";
import type { Department } from "./_types/form";
import { type Student } from "@/types/student";

export default async function Page() {
    const me = (await api.student.me().catch((e) => {
        if (e instanceof TRPCError && e.code == "UNAUTHORIZED") {
            redirect("/logout");
        }
    })) as Student;

    const miscData = await api.student.getMiscInfo();

    const departments = miscData?.engineeringDepartments as Department[];

    return <FormComponent studentData={me} departments={departments} />;
}
