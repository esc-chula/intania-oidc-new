import type {
    StudentLoginResponse,
    MeResponse,
} from "@/generated/intania/auth/account/v1/account";
import type {
    ListStudentMappingResponse,
    Student,
} from "@/generated/intania/auth/student/v1/student";
import { grpc } from "@/server/grpc";

type Response<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          errors: string[];
      };

export async function loginStudent(
    username: string,
    password: string,
): Promise<Response<StudentLoginResponse>> {
    const response = await grpc.account.studentLogin({
        username,
        password,
        verifyWithLdap: true,
    });

    return {
        success: true,
        data: response,
    };
}

export async function me(sid: string): Promise<Response<MeResponse>> {
    const response = await grpc.account.me({
        sessionId: sid,
    });

    return {
        success: true,
        data: response,
    };
}

export async function updateStudent(sid: string, body: Student): Promise<void> {
    const masks = extractField(body);

    return grpc.student
        .updateStudent({
            masks,
            sid: sid,
            student: body,
        })
        .then(() => {
            return;
        });
}

export async function listStudentMapping(
    masks?: string[],
): Promise<Response<ListStudentMappingResponse>> {
    const response = await grpc.student.listStudentMapping({
        masks,
    });

    return {
        success: true,
        data: response,
    };
}

// Mapping for available updateable field.
const studentKeyMap: Record<keyof Student, string | null> = {
    id: null,
    studentId: null,
    createdAt: null,
    updatedAt: null,
    profilePictureKey: null,
    emailVerified: null,
    phoneNumberVerified: null,
    titleTh: "student.title_th",
    titleEn: "student.title_en",
    firstNameTh: "student.first_name_th",
    middleNameTh: "student.middle_name_th",
    familyNameTh: "student.family_name_th",
    nicknameTh: "student.nickname_th",
    firstNameEn: "student.first_name_en",
    middleNameEn: "student.middle_name_en",
    familyNameEn: "student.family_name_en",
    nicknameEn: "student.nickname_en",
    preferredPronoun: "student.preferred_pronoun",
    birthDate: "student.birth_date",
    department: "student.department.id",
    nationalId: "student.national_id",
    lineId: "student.line_id",
    facebook: "student.facebook",
    email: "student.email",
    phoneNumber: "student.phone_number",
    nationality: "student.nationality.id",
    religion: "student.religion.id",
    currentAddressProvince: "student.current_address_province.id",
    currentAddressDistrict: "student.current_address_district.id",
    currentAddressOther: "student.current_address_other",
    currentAddressLatitude: "student.current_address_latitude",
    currentAddressLongitude: "student.current_address_longitude",
    hometownAddressProvince: "student.hometown_address_province.id",
    hometownAddressDistrict: "student.hometown_address_district.id",
    hometownAddressOther: "student.hometown_address_other",
    hometownAddressLatitude: "student.hometown_address_latitude",
    hometownAddressLongitude: "student.hometown_address_longitude",
    bloodType: "student.blood_type",
    foodLimitations: "student.food_limitations",
    drugAllergies: "student.drug_allergies",
    medicalConditions: "student.medical_conditions",
    medications: "student.medications",
    shirtSize: "student.shirt_size",
    instagram: "student.instagram",
    familyStatus: "student.family_status.id",
    parent: "student.parent",
    siblingTotal: "student.sibling_total",
    siblingOrder: "student.sibling_order",
    parentPhoneNumber: "student.parent_phone_number",
    parentAddress: "student.parent_address",
    fatherName: "student.father_name",
    fatherBirthYear: "student.father_birth_year",
    fatherStatus: "student.father_status.id",
    motherName: "student.mother_name",
    motherBirthYear: "student.mother_birth_year",
    motherStatus: "student.mother_status.id",
    currentAddressNumber: "student.current_address_number",
    hometownAddressNumber: "student.hometown_address_number",
    cueaDataTransferAgreement: "student.cuea_data_transfer_agreement",
};

function extractField(student: Student): string[] {
    const ret = [];

    const keys = Object.keys(student) as (keyof Student)[];
    for (const key of keys) {
        const mapped = studentKeyMap[key];
        if (mapped) {
            ret.push(mapped);
        }
    }

    return ret;
}
