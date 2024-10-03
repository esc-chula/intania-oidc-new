import { redirect } from "next/navigation";
import FormComponent from "@/components/register/2-form";
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

    if (!meData.student) {
        throw new Error("Something went wrong");
    }

    const miscDataResponse = await listStudentMapping([
        "countries",
        "provinces",
        "districts",
        "religions",
    ]);

    if (!miscDataResponse.success) {
        throw new Error("Something went wrong");
    }

    const miscData = miscDataResponse.data;

    const countries = miscData.countries;
    const provinces = miscData.provinces;
    const districts = miscData.districts;
    const religions = miscData.religions;

    return (
        <FormComponent
            studentData={meData.student}
            countries={countries}
            provinces={provinces}
            districts={districts}
            religions={religions}
        />
    );
}
