import ESCLogoBackground from "@/components/esc/esc-logo-background";
import LoginBox from "@/components/login/login-box";
import LoginFooter from "@/components/login/login-footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid");
    if (sid) {
        redirect("/register");
    }

    return (
        <>
            <div className="flex size-full flex-col items-center">
                <div className="absolute top-1/2 flex size-full max-w-3xl -translate-y-1/2 flex-col items-center justify-between md:h-auto md:justify-center md:px-32 lg:max-w-6xl">
                    <LoginBox />
                    <LoginFooter />
                </div>
            </div>
            <ESCLogoBackground />
        </>
    );
}
