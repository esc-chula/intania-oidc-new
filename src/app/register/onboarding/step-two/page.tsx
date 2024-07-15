import FormComponent from "./_components/form";
import { api } from "@/trpc/server";
import type { Country, District, Province, Religion } from "./types/form";

export default async function Page() {
    const miscData = await api.student.getMiscInfo();

    const countries = miscData?.countries as Country[];
    const provinces = miscData?.thaiProvinces as Province[];
    const districts = miscData?.thaiDistricts as District[];
    const religions = miscData?.religions as Religion[];

    return (
        <FormComponent
            countries={countries}
            provinces={provinces}
            districts={districts}
            religions={religions}
        />
    );
}
