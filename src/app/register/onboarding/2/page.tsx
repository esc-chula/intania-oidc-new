import { redirect } from "next/navigation";
import FormComponent2 from "@/components/register/2-form";
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

    if (!meData.student) {
        throw new Error("Something went wrong");
    }

    const miscData = await getCachedMapping([
        "countries",
        "provinces",
        "districts",
        "religions",
    ]);

    const countries = miscData.countries;
    const provinces = miscData.provinces;
    const districts = miscData.districts;
    const religions = miscData.religions;

    return (
        <FormComponent2
            studentData={meData.student}
            countries={countries}
            provinces={provinces}
            districts={districts}
            religions={religions}
        />
    );
}
