import FormComponent from "./_components/form";
import { api } from "@/trpc/server";

interface Country {
    code: string | null;
    name: string | null;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
}

interface Province {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    nameTh: string | null;
    nameEn: string | null;
    provinceCode: number | null; // Allow provinceCode to be number or null
}

interface District {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    nameTh: string | null;
    nameEn: string | null;
    provinceCode: number | null;
    districtCode: number | null;
    postalCode: number | null;
}

export default async function Page() {
    const miscData = await api.student.getMiscInfo();

    const countries = miscData?.countries as Country[];
    const provinces = miscData?.thaiProvinces as Province[];
    const districts = miscData?.thaiDistricts as District[];

    return (
        <FormComponent
            countries={countries}
            provinces={provinces}
            districts={districts}
        />
    );
}
