"use client";

import { createContext, useContext, useState } from "react";

export interface ProfileContextProps {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileContext = createContext<ProfileContextProps | null>({
    isEditing: false,
    setIsEditing: () => null,
});

export default function ProfileContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    return (
        <ProfileContext.Provider value={{ isEditing, setIsEditing }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error(
            "useProfile must be used within a ProfileContextProvider",
        );
    }
    return context;
};
