import type {
    Country,
    Department,
    District,
    FamilyMemberStatus,
    FamilyStatus,
    Province,
    Religion,
} from "@/generated/intania/auth/student/v1/student";
import { listStudentMapping } from "@/server/controller/auth";

type Choice =
    | "departments"
    | "countries"
    | "religions"
    | "familyMemberStatuses"
    | "familyStatuses"
    | "provinces"
    | "districts";

type ChoiceMap<T extends Choice> = T extends "departments"
    ? Department
    : T extends "countries"
      ? Country
      : T extends "religions"
        ? Religion
        : T extends "familyMemberStatuses"
          ? FamilyMemberStatus
          : T extends "familyStatuses"
            ? FamilyStatus
            : T extends "provinces"
              ? Province
              : T extends "districts"
                ? District
                : never;

const data: {
    [K in Choice]: {
        lastFetch: null | number;
        data: ChoiceMap<K>[];
    };
} = {
    departments: {
        lastFetch: null,
        data: [],
    },
    countries: {
        lastFetch: null,
        data: [],
    },
    religions: {
        lastFetch: null,
        data: [],
    },
    familyMemberStatuses: {
        lastFetch: null,
        data: [],
    },
    familyStatuses: {
        lastFetch: null,
        data: [],
    },
    provinces: {
        lastFetch: null,
        data: [],
    },
    districts: {
        lastFetch: null,
        data: [],
    },
};

const keyMap = {
    departments: "departments",
    countries: "countries",
    religions: "religions",
    familyMemberStatuses: "family_member_statuses",
    familyStatuses: "family_statuses",
    provinces: "provinces",
    districts: "districts",
} as const;

async function refreshCache(keys: Choice[]) {
    const masks: (typeof keyMap)[Choice][] = [];
    for (const k of keys) {
        masks.push(keyMap[k]);
    }

    const response = await listStudentMapping(masks);
    if (!response.success) {
        throw new Error("Unable to fetch student mapping");
    }

    const now = Date.now();

    for (const k of keys) {
        data[k].data = response.data[k];
        data[k].lastFetch = now;
    }
}

export async function getCachedMapping<T extends Choice[]>(
    mapping: T,
): Promise<{
    [K in T[number]]: ChoiceMap<K>[];
}> {
    const out: Partial<{
        [K in Choice]: ChoiceMap<K>[];
    }> = {};

    const refreshKeys: Choice[] = [];
    const now = Date.now();

    for (const key of mapping) {
        if (!data[key].lastFetch || data[key].lastFetch - now > 3_600_000) {
            refreshKeys.push(key);
        }
    }

    await refreshCache(refreshKeys);

    for (const key of mapping) {
        out[key] = data[key].data;
    }

    return out as {
        [K in T[number]]: ChoiceMap<K>[];
    };
}
