import ESCLogoBackground from "@/components/esc/esc-logo-background";
import LoginFooter from "@/components/login/login-footer";
import OAuthLoginBox from "@/components/oauth2/login-box";
import { redirect } from "next/navigation";
import { hydra } from "@/server/api/hydra";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { grpc } from "@/server/grpc";

export default async function Page({
    searchParams,
}: {
    searchParams?: Record<string, string | string[] | undefined>;
}) {
    const challenge =
        typeof searchParams?.login_challenge === "string"
            ? searchParams.login_challenge
            : null;
    if (!challenge) {
        redirect("/");
    }
    try {
        const { data: loginRequest } = await hydra.getOAuth2LoginRequest({
            loginChallenge: challenge,
        });

        if (loginRequest.skip) {
            await hydra
                .acceptOAuth2LoginRequest({
                    loginChallenge: challenge,
                    acceptOAuth2LoginRequest: {
                        subject: loginRequest.subject,
                    },
                })
                .then(({ data }) => {
                    redirect(data.redirect_to);
                });
        }

        const jar = cookies();
        const sessionId = jar.get("sid")?.value;

        if (sessionId) {
            const me = await grpc.account
                .me({
                    sessionId,
                })
                .catch((_) => {
                    redirect("/logout");
                });

            if (!me.account) {
                throw new Error("Something went wrong");
            }

            const subject = me.account?.publicId;

            await hydra
                .acceptOAuth2LoginRequest({
                    loginChallenge: challenge,
                    acceptOAuth2LoginRequest: {
                        subject,
                    },
                })
                .then(({ data }) => {
                    redirect(data.redirect_to);
                });
        }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        console.log(error);
        redirect("/");
    }

    return (
        <>
            <div className="flex size-full flex-col items-center">
                <div className="absolute top-1/2 flex size-full max-w-3xl -translate-y-1/2 flex-col items-center justify-between md:h-auto md:justify-center md:px-32 lg:max-w-6xl">
                    <OAuthLoginBox />
                    <LoginFooter />
                </div>
            </div>
            <ESCLogoBackground />
        </>
    );
}
