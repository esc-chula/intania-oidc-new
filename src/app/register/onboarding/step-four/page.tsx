import { api } from "@/trpc/server";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";
import type { Student } from "@/types/student";
import type { FamilyStatuses, FamilyMemberStatuses } from "@/types/misc";
import FormComponent from "@/components/register/4-form";

export default async function Page() {
    const me = (await api.student.me().catch((e) => {
        if (e instanceof TRPCError && e.code == "UNAUTHORIZED") {
            redirect("/logout");
        }
    })) as Student;

    const miscData = await api.student.getMiscInfo();

    const familyStatuses = miscData?.familyStatuses as FamilyStatuses[];
    const familyMemberStatuses =
        miscData?.familyMemberStatuses as FamilyMemberStatuses[];

    return (
        <FormComponent
            studentData={me}
            familyStatuses={familyStatuses}
            familyMemberStatuses={familyMemberStatuses}
        />
    );
}
