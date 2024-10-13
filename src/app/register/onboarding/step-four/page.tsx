import { redirect } from "next/navigation";
import FormComponent from "@/components/register/4-form";
import { grpc } from "@/server/grpc";
import { cookies } from "next/headers";
import {
    FamilyMemberStatus,
    FamilyStatus,
} from "@/generated/intania/auth/student/v1/student";

export default async function Page() {
    const jar = cookies();
    const sessionId = jar.get("sid")?.value;
    if (!sessionId) return redirect("/logout");

    const me = await grpc.account
        .me({
            sessionId,
        })
        .catch((_) => {
            redirect("/logout");
        });

    if (!me.student) {
        throw new Error("Something went wrong");
    }

    const miscData = await grpc.student.listStudentMapping({
        masks: ["family_statuses", "family_member_statuses"],
    });

    const familyStatuses = miscData?.familyStatuses as FamilyStatus[];
    const familyMemberStatuses =
        miscData?.familyMemberStatuses as FamilyMemberStatus[];

    return (
        <FormComponent
            studentData={me.student}
            familyStatuses={familyStatuses}
            familyMemberStatuses={familyMemberStatuses}
        />
    );
}
