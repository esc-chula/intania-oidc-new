import { redirect } from "next/navigation";
import FormComponent from "@/components/register/4-form";
import { cookies } from "next/headers";
import { listStudentMapping, me } from "@/server/controller/auth";

export default async function Page() {
    const sessionId = cookies().get("sid")?.value;
    if (!sessionId) return redirect("/logout");

    const meResponse = await me(sessionId);

    if (!meResponse.success) {
        const errors = meResponse.errors;
        throw new Error(errors.join(", "));
    }

    const meData = meResponse.data;

    if (!meData.student || !meData.account?.publicId) {
        throw new Error("Something went wrong");
    }

    const miscDataResponse = await listStudentMapping([
        "family_statuses",
        "family_member_statuses",
    ]);
    if (!miscDataResponse.success) {
        throw new Error("Something went wrong");
    }

    const miscData = miscDataResponse.data;

    const familyStatuses = miscData?.familyStatuses;
    const familyMemberStatuses = miscData?.familyMemberStatuses;

    return (
        <FormComponent
            studentData={meData.student}
            familyStatuses={familyStatuses}
            familyMemberStatuses={familyMemberStatuses}
        />
    );
}
