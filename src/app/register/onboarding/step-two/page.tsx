import type { Country, District, Province, Religion } from "@/types/misc";
import { redirect } from "next/navigation";
import FormComponent from "@/components/register/2-form";
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

    if (!me.student) {
        throw new Error("Something went wrong")
    }

    const miscData = await grpc.student.listStudentMapping({
        masks: ["countries", "provinces", "districts", "religions"],
    });

    const countries = miscData.countries as Country[];
    const provinces = miscData.provinces as Province[];
    const districts = miscData.districts as District[];
    const religions = miscData.religions as Religion[];

    return (
        <FormComponent
            studentData={me.student}
            countries={countries}
            provinces={provinces}
            districts={districts}
            religions={religions}
        />
    );
}
