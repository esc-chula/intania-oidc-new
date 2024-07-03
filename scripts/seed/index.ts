import thaiProvincesData from "../../thailand-geography-json/src/provinces.json" with { type: "json" };
import thaiDistrictsData from "../../thailand-geography-json/src/districts.json" with { type: "json" };
import religionsData from "./religions.json" with { type: "json" };
import familyStatusesData from "./family_statuses.json" with { type: "json" };
import familyMemberStatusesData from "./family_member_statuses.json" with { type: "json" };
import engineeringDepartmentsData from "./engineering_departments.json" with { type: "json" };
import countriesData from "./countries.json" with { type: "json" };
import { db } from "@/server/db"
import { countries, engineeringDepartments, familyMemberStatuses, familyStatuses, religions, thaiDistricts, thaiProvinces } from "@/server/db/schema";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

function info(...args: any[]) {
    console.info(`${GREEN}[INFO]:${RESET}`, ...args)
}

function error(...args: any[]) {
    console.info(`${RED}[ERROR]:${RESET}`, ...args)
}

const promises: Promise<void>[] = [];

function seedOne(context: string, table: any, data: any[]) {
    const promise = db
        .insert(table)
        .values(data)
        .onConflictDoNothing()
        .then(() => info(`seed ${context} successfully.`))
        .catch((e) => error(`failed to seed ${context}.`, e));

    promises.push(promise);
}

const insertProvinceData = thaiProvincesData.map(({ provinceCode, provinceNameEn, provinceNameTh }) => ({
    nameEn: provinceNameEn,
    nameTh: provinceNameTh,
    provinceCode,
}));

seedOne("province", thaiProvinces, insertProvinceData);

const insertDistrictData = thaiDistrictsData.map(({ provinceCode, postalCode, districtCode, districtNameEn, districtNameTh }) => ({
    districtCode,
    postalCode,
    provinceCode,
    nameTh: districtNameTh,
    nameEn: districtNameEn,
}));

seedOne("district", thaiDistricts, insertDistrictData);
seedOne("religion", religions, religionsData);
seedOne("family status", familyStatuses, familyStatusesData);
seedOne("family member status", familyMemberStatuses, familyMemberStatusesData);
seedOne("engineering department", engineeringDepartments, engineeringDepartmentsData);
seedOne("country", countries, countriesData);

await Promise.allSettled(promises);

process.exit(0);
