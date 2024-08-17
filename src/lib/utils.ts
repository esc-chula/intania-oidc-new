import { type Student } from "@/types/student";
import { type OAuth2ConsentRequest } from "@ory/hydra-client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function titleThToEn(titleTh: string): string {
    switch (titleTh) {
        case "นาย":
            return "Mr.";
        case "นาง":
            return "Mrs.";
        case "นางสาว":
            return "Miss";
        case "เด็กชาย":
            return "Master";
        case "เด็กหญิง":
            return "Miss";
        default:
            return titleTh;
    }
}

const THScopeMap: Record<string, string> = {
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
    const sharedData: string[] = [];
    for (const scope in THScopeMap) {
        const value = THScopeMap[scope];
        if (grantScope.includes(scope) && value) {
            sharedData.push(value);
        }
    }
    return sharedData;
}

const scopeMapping: Record<
    string,
    (student: Student, idToken: Record<string, unknown>) => void
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
    department: (student, idToken) => {
        idToken.department_id = student.departmentId;
    },
};

export function createOAuth2ConsentRequestSession(
    consentRequest: OAuth2ConsentRequest,
    student: Student,
) {
    try {
        if (consentRequest.subject !== student.id.toString()) {
            throw new Error(
                "student id is not match with consent request subject",
            );
        }
        const grantScope: string[] = consentRequest.requested_scope ?? [];

        const id_token: Record<string, unknown> = {};

        Object.keys(scopeMapping).forEach((scope) => {
            const mapping = scopeMapping[scope];
            if (grantScope.includes(scope) && mapping) {
                mapping(student, id_token);
            }
        });

        return {
            id_token,
        };
    } catch (error) {
        throw error;
    }
}
