import type {
    Department,
    Student,
} from "@/generated/intania/auth/student/v1/student";
import { getCachedMapping } from "@/server/data/mapper";
import type { OAuth2ConsentRequest } from "@ory/hydra-client";

const THScopeNameMapping: Record<string, string> = {
    profile: "ชื่อ",
    student_id: "รหัสนิสิต",
    email: "อีเมล",
    phone_number: "เบอร์โทรศัพท์",
    shirt_size: "ไซส์เสื้อ",
    medical: "ประวัติทางการแพทย์",
    social_line: "ไอดีไลน์",
    social_facebook: "เฟสบุ๊ค",
    national_id: "เลขประจำตัวประชาชน",
    picture: "ภาพถ่าย",
    department: "ภาควิชา",
};

export function getSharedResourcesFromScope(grantScope: string[]): string[] {
    const sharedResources: string[] = [];
    for (const [scope, THName] of Object.entries(THScopeNameMapping)) {
        if (grantScope.includes(scope)) {
            sharedResources.push(THName);
        }
    }
    return sharedResources;
}

type MappingContext = {
    departments: Department[];
};

export const scopeMapping: Record<
    string,
    (
        student: Student,
        idToken: Record<string, unknown>,
        context: MappingContext,
    ) => void
> = {
    profile: (student, idToken) => {
        idToken.nickname_en = student.nicknameEn;
        idToken.nickname_th = student.nicknameTh;
        idToken.preferred_pronoun = student.preferredPronoun;
        idToken.title_en = student.titleEn;
        idToken.title_th = student.titleTh;
        idToken.first_name_th = student.firstNameTh;
        idToken.first_name_en = student.firstNameEn;
        idToken.middle_name_en = student.middleNameEn;
        idToken.middle_name_th = student.middleNameTh;
        idToken.family_name_en = student.familyNameEn;
        idToken.family_name_th = student.familyNameTh;
    },
    student_id: (student, idToken) => {
        idToken.student_id = student.studentId;
    },
    email: (student, idToken) => {
        idToken.email = student.email;
        idToken.email_verified = student.emailVerified;
    },
    phone_number: (student, idToken) => {
        idToken.phone_number = student.phoneNumber;
        idToken.phone_number_verified = student.phoneNumberVerified;
    },
    shirt_size: (student, idToken) => {
        idToken.shirt_size = student.shirtSize;
    },
    medical: (student, idToken) => {
        idToken.medical_conditions = student.medicalConditions;
        idToken.medications = student.medications;
        idToken.drug_allergies = student.drugAllergies;
        idToken.food_limitations = student.foodLimitations;
    },
    social_line: (student, idToken) => {
        idToken.line_id = student.lineId;
    },
    social_facebook: (student, idToken) => {
        idToken.facebook = student.facebook;
    },
    national_id: (student, idToken) => {
        idToken.national_id = student.nationalId;
    },
    picture: (student, idToken) => {
        idToken.profile_picture_key = student.profilePictureKey;
    },
    department: (student, idToken, mappingContext) => {
        const departmentMapping = mappingContext.departments;

        if (!student.department?.id) {
            idToken.department_id = null;
            idToken.department_name_en = null;
            idToken.department_name_th = null;
            return;
        }

        const departmentId = student.department.id;

        idToken.department_id = departmentId;
        const department = departmentMapping.find(
            (dep) => dep.id === departmentId,
        );
        idToken.department_name_en = department?.nameEn ?? null;
        idToken.department_name_th = department?.nameTh ?? null;
    },
};

export async function createOAuth2ConsentRequestSession(
    consentRequest: OAuth2ConsentRequest,
    student: Student,
    publicId: string,
) {
    if (consentRequest.subject !== publicId) {
        throw new Error(
            "student id does not match with consent request subject",
        );
    }
    const grantScope: string[] = consentRequest.requested_scope ?? [];

    const id_token: Record<string, unknown> = {};

    const departments = (await getCachedMapping(["departments"])).departments;

    for (const [scope, mapping] of Object.entries(scopeMapping)) {
        if (grantScope.includes(scope)) {
            mapping(student, id_token, { departments });
        }
    }

    return {
        id_token,
    };
}
