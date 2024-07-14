import React, { createContext, useContext, useState } from "react";
import { z } from "zod";

const userSchema = z.object({
    studentId: z.string().max(32).optional(),
    departmentId: z.number().optional(),
    nationalId: z.string().max(15).optional(),
    title: z.string().max(16).optional(),
    firstNameTh: z.string().max(30).optional(),
    firstNameEn: z.string().max(30).optional(),
    familyNameTh: z.string().max(60).optional(),
    familyNameEn: z.string().max(60).optional(),
    middleNameTh: z.string().max(60).optional(),
    middleNameEn: z.string().max(60).optional(),
    nicknameTh: z.string().max(30).optional(),
    nicknameEn: z.string().max(30).optional(),
    preferredPronoun: z.string().max(30).optional(),
    lineId: z.string().max(30).optional(),
    facebook: z.string().max(60).optional(),

    foodLimitations: z.string().max(100).optional(), // comma-sepearated string
    drugAllergies: z.string().max(100).optional(), // comma-sepearated string
    medicalConditions: z.string().max(100).optional(), // comma-sepearated string
    medications: z.string().max(100).optional(), // comma-sepearated string

    email: z.string().max(60).optional(),
    emailVerified: z.boolean().optional(),
    phoneNumber: z.string().max(16).optional(),
    phoneNumberVerified: z.boolean().optional(),

    birthDate: z.string().datetime().optional(),
    bloodType: z.enum(["A", "B", "AB", "O"]).optional(),
    nationalityId: z.number().optional(),
    religionId: z.number().optional(),
    shirtSize: z.string().max(15).optional(),

    currentAddressNumber: z.string().max(60).optional(),
    currentAddressProvinceId: z.number().optional(),
    currentAddressDistrictId: z.number().optional(),
    currentAddressOther: z.string().max(400).optional(),
    currentAddressLatitude: z.string().max(16).optional(),
    currentAddressLongitude: z.string().max(16).optional(),

    hometownAddressNumber: z.string().max(60).optional(),
    hometownAddressProvinceId: z.number().optional(),
    hometownAddressDistrictId: z.number().optional(),
    hometownAddressOther: z.string().max(400).optional(),
    hometownAddressLatitude: z.string().max(16).optional(),
    hometownAddressLongitude: z.string().max(16).optional(), // 6 + 9 + 1

    fatherName: z.string().max(150).optional(), // full name in english
    fatherBirthYear: z.number().optional(),
    fatherStatusId: z.number().optional(),

    motherName: z.string().max(150).optional(), // full name in english
    motherBirthYear: z.number().optional(),
    motherStatusId: z.number().optional(),

    familyStatusId: z.number().optional(),

    parent: z.enum(["Father", "Mother", "Other"]).optional(),
    parentPhoneNumber: z.string().max(16).optional(),
    parentAddress: z.string().max(400).optional(),

    siblingTotal: z.number().optional(),
    siblingOrder: z.number().optional(),

    profilePictureKey: z.string().max(30).optional(),
});

export type User = z.infer<typeof userSchema>;

export interface UserFormContextProps {
    user: User | null;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    updateUserData: (property: Partial<User>) => void;
    postUserData: () => Promise<void>;
}

export const UserFormContext = createContext<UserFormContextProps | null>({
    user: null,
    step: 1,
    setStep: () => null,
    updateUserData: () => null,
    postUserData: () => Promise.resolve(),
});

export function UserFormContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [step, setStep] = useState<number>(1);

    const updateUserData = (values: Partial<User>) => {
        setUser({ ...user, ...values });
    };

    const postUserData = async () => {
        // POST user data to backend
    };

    return (
        <UserFormContext.Provider
            value={{ user, updateUserData, step, setStep, postUserData }}
        >
            {children}
        </UserFormContext.Provider>
    );
}

export const useUserForm = () => {
    const context = useContext(UserFormContext);
    if (!context) {
        throw new Error(
            "useUserForm must be used within a UserFormContextProvider",
        );
    }
    return context;
};
