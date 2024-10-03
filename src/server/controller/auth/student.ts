import { Student as GrpcStudent } from "@/generated/intania/auth/student/v1/student";
import { grpc } from "@/server/grpc";
import { Student } from "@/types/student";

export async function updateStudent(sid: string, body: Student): Promise<void> {
    const grpcBody = mapStudentRelationship(body);
    const masks = extractField(body);

    return grpc.student.updateStudent({
        masks,
        sid: sid,
        student: grpcBody,
    }).then(_ => {
        return
    });
}

// Mapping for available updateable field.
const studentKeyMap: Record<keyof Student, string | null> = {
    id: null,
    studentId: null,
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
    departmentId: "student.department.id",
    nationalId: "student.national_id",
    lineId: "student.line_id",
    facebook: "student.facebook",
    email: "student.email",
    phoneNumber: "student.phone_number",
    nationalityId: "student.nationality.id",
    religionId: "student.religion.id",
    currentAddressProvinceId: "student.current_address_province.id",
    currentAddressDistrictId: "student.current_address_district.id",
    currentAddressOther: "student.current_address_other",
    currentAddressLatitude: "student.current_address_latitude",
    currentAddressLongitude: "student.current_address_longitude",
    hometownAddressProvinceId: "student.hometown_address_province.id",
    hometownAddressDistrictId: "student.hometown_address_district.id",
    hometownAddressOther: "student.hometown_address_other",
    hometownAddressLatitude: "student.hometown_address_latitude",
    hometownAddressLongitude: "student.hometown_address_longitude"
}

function mapStudentRelationship(body: Student): GrpcStudent {
    const ret: GrpcStudent = {
        ...body,
    };
    const departmentId = body.departmentId
    if (departmentId) {
        ret.department = {
            id: departmentId
        }
    }

    return ret;
}

function extractField(student: Student): string[] {
    const ret = [];

    const keys = Object.keys(student) as (keyof Student)[];
    for (const key of keys) {
        const mapped = studentKeyMap[key];
        if (mapped) {
            ret.push(mapped)
        }
    }

    return ret
}
