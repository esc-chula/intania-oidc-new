import { redirect } from "next/navigation";
import FormComponent4 from "@/components/register/4-form";
import { cookies } from "next/headers";
import { me } from "@/server/controller/auth";
import { getCachedMapping } from "@/server/data/mapper";

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

    const miscData = await getCachedMapping([
        "familyMemberStatuses",
        "familyStatuses",
    ]);

    const familyStatuses = miscData.familyStatuses;
    const familyMemberStatuses = miscData.familyMemberStatuses;

    return (
        <FormComponent4
            studentData={meData.student}
            familyStatuses={familyStatuses}
            familyMemberStatuses={familyMemberStatuses}
        />
    );
}
