import { api } from "@/trpc/server";
import type { Country, District, Province, Religion } from "@/types/misc";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";
import type { Student } from "@/types/student";
import FormComponent from "@/components/register/2-form";

export default async function Page() {
    const me = (await api.student.me().catch((e) => {
        if (e instanceof TRPCError && e.code == "UNAUTHORIZED") {
            redirect("/logout");
        }
    })) as Student;

    const miscData = await api.student.getMiscInfo();

    const countries = miscData?.countries as Country[];
    const provinces = miscData?.thaiProvinces as Province[];
    const districts = miscData?.thaiDistricts as District[];
    const religions = miscData?.religions as Religion[];

    return (
        <FormComponent
            studentData={me}
            countries={countries}
            provinces={provinces}
            districts={districts}
            religions={religions}
        />
    );
}
