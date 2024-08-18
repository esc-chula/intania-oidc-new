import ESCLogoBackground from "@/components/esc/esc-logo-background";
import LoginBox from "@/components/login/login-box";
import LoginFooter from "@/components/login/login-footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({
    params,
}: {
    params: { redirect: string };
}) {
    const cookieStore = cookies();
    const sid = cookieStore.get("sid");
    const redirectUrl = params.redirect;

    if (sid) {
        const allowedRedirect = validateRedirectUrl(redirectUrl);
        if (allowedRedirect) {
            redirect(allowedRedirect);
        } else {
            redirect("/profile");
        }
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

function validateRedirectUrl(redirectUrl: string | null): string | null {
    if (!redirectUrl) return null;

    const allowedUrls = process.env.ALLOW_REDIRECT_URLS?.split(",") ?? [];
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

        return isValid ? redirectUrl : null;
    } catch (e) {
        return null;
    }
}
