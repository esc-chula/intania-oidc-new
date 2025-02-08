import StudentFormContextProvider from "@/contexts/form-context";
import Transition from "./template";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/register/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid");

    if (!sid) {
        redirect("/");
    }

    return (
        <article className="flex size-full flex-col gap-16 px-6 py-7 md:gap-24">
            <StudentFormContextProvider>
                <Header />
                <Transition>{children}</Transition>
            </StudentFormContextProvider>
        </article>
    );
}
