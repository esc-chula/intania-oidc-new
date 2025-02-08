import { type Metadata } from "next";

import ProfileContextProvider from "@/contexts/profile-context";

export const metadata: Metadata = {
    title: "โปรไฟล์ - Intania Accounts",
};

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
    children,
}) => {
    return <ProfileContextProvider>{children}</ProfileContextProvider>;
};

export default Layout;
