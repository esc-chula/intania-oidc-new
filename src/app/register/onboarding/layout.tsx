"use client";

import { UserFormContextProvider } from "@/contexts/form-context";
import Progress from "./_components/progress";
import Transition from "./template";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <article className="flex size-full flex-col gap-24 px-6 py-7">
            <UserFormContextProvider>
                <Progress />
                <Transition>{children}</Transition>
            </UserFormContextProvider>
        </article>
    );
};

export default Layout;
