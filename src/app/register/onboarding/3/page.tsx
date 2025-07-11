import { redirect } from "next/navigation";
import FormComponent3 from "@/components/register/3-form";
import { cookies } from "next/headers";
import { me } from "@/server/controller/auth";

export default async function Page() {
    const sessionId = cookies().get("sid")?.value;
    if (!sessionId) return redirect("/logout");

    const meResponse = await me(sessionId);

    if (!meResponse.success) {
        const errors = meResponse.errors;
        throw new Error(errors.join(", "));
    }

    const meData = meResponse.data;

    if (!meData.student) {
        throw new Error("Something went wrong");
    }

    return <FormComponent3 studentData={meData.student} />;
}
