import { type Metadata } from "next";

import Background from "@/components/common/background";
import ProfileContextProvider from "@/contexts/profile-context";

export const metadata: Metadata = {
    title: "โปรไฟล์ - Intania Accounts",
};

const Layout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
    children,
}) => {
    return (
        <ProfileContextProvider>
            <section className="mx-auto max-w-screen-md">{children}</section>
            <Background />
        </ProfileContextProvider>
    );
};

export default Layout;
