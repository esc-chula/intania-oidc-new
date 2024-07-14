import { UserFormContextProvider } from "@/contexts/form-context";
import Progress from "./_components/progress";
import Transition from "./template";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid");

    if (!sid) {
        redirect("/");
    }

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
