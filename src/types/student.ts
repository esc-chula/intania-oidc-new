import { Department } from "./misc";

export type Student = {
    id: number
    studentId?: string
    titleTh?: string
    titleEn?: string
    firstNameTh?: string
    middleNameTh?: string
    familyNameTh?: string
    nicknameTh?: string
    firstNameEn?: string
    middleNameEn?: string
    familyNameEn?: string
    nicknameEn?: string
    preferredPronoun?: string
    birthDate?: Date
    departmentId?: number
    department?: Department
    nationalId?: string
    lineId?: string
    facebook?: string
    email?: string
    phoneNumber?: string
    nationalityId?: number
    religionId?: number
    currentAddressProvinceId?: number
    currentAddressDistrictId?: number
    currentAddressOther?: string
    currentAddressLatitude?: number
    currentAddressLongitude?: number
    hometownAddressProvinceId?: number
    hometownAddressDistrictId?: number
    hometownAddressOther?: string
    hometownAddressLatitude?: number
    hometownAddressLongitude?: number
};
