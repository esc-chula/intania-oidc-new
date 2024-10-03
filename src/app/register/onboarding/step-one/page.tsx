import { redirect } from "next/navigation";
import FormComponent from "@/components/register/1-form";
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

    const miscDataResponse = await listStudentMapping(["departments"]);

    if (!miscDataResponse.success) {
        const errors = miscDataResponse.errors;
        throw new Error(errors.join(", "));
    }

    const miscData = miscDataResponse.data;

    const departments = miscData.departments;

    return (
        <FormComponent studentData={meData.student} departments={departments} />
    );
}
