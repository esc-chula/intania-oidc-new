"use client";

import { createContext, useContext, useState } from "react";

export interface StudentFormContextProps {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const StudentFormContext = createContext<StudentFormContextProps | null>(
    {
        step: 1,
        setStep: () => null,
    },
);

export default function StudentFormContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [step, setStep] = useState<number>(1);
    return (
        <StudentFormContext.Provider value={{ step, setStep }}>
            {children}
        </StudentFormContext.Provider>
    );
}

export const useStudentForm = () => {
    const context = useContext(StudentFormContext);
    if (!context) {
        throw new Error(
            "useUserForm must be used within a UserFormContextProvider",
        );
    }
    return context;
};
