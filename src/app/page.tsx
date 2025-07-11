import LoginBox from "@/components/login/login-box";
import LoginFooter from "@/components/login/login-footer";
import { env } from "next-runtime-env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    searchParams,
}: {
    searchParams: { redirect: string };
}) {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid");
    const redirectUrl = searchParams.redirect;

    if (sid) {
        if (validateRedirectUrl(redirectUrl)) {
            redirect(redirectUrl);
        } else {
            redirect("/profile");
        }
    }

    return (
        <div className="flex size-full flex-col items-center">
            <div className="absolute top-1/2 flex size-full max-w-3xl -translate-y-1/2 flex-col items-center justify-between md:h-auto md:justify-center md:px-32 lg:max-w-6xl">
                <LoginBox />
                <LoginFooter />
            </div>
        </div>
    );
}

function validateRedirectUrl(redirectUrl: string | null): boolean {
    if (!redirectUrl) return false;

    const allowedUrls = env("ALLOW_REDIRECT_URLS")?.split(",") ?? [];
    try {
        const url = new URL(redirectUrl);

        const isValid = allowedUrls.some((allowedUrl) => {
            const allowed = new URL(allowedUrl);
            return (
                url.protocol === allowed.protocol &&
                url.hostname === allowed.hostname &&
                (!allowed.port || url.port === allowed.port)
            );
        });

        return isValid;
    } catch (e) {
        return false;
    }
}
