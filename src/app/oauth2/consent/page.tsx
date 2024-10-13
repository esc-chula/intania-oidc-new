import ESCLogoBackground from "@/components/esc/esc-logo-background";
import LoginFooter from "@/components/login/login-footer";
import { redirect } from "next/navigation";
import { hydra } from "@/server/api/hydra";
import { isRedirectError } from "next/dist/client/components/redirect";
import ConsentBox from "@/components/oauth2/consent-box";
import {
    createOAuth2ConsentRequestSession,
    getSharedResourcesFromScope,
} from "@/lib/utils";
import { cookies } from "next/headers";
import { grpc } from "@/server/grpc";

export default async function Page({
    searchParams,
}: {
    searchParams?: Record<string, string | string[] | undefined>;
}) {
    const challenge =
        typeof searchParams?.consent_challenge === "string"
            ? searchParams.consent_challenge
            : null;
    if (!challenge) {
        redirect("/");
    }

    let appName: string | undefined = undefined;
    let sharedResources: string[] = [];
    let studentId: string | undefined = undefined;
    let studentName: string | undefined = undefined;

    try {
        const { data: consentRequest } = await hydra.getOAuth2ConsentRequest({
            consentChallenge: challenge,
        });
        const grantScope: string[] = consentRequest.requested_scope ?? [];
        sharedResources = getSharedResourcesFromScope(grantScope);
        appName = consentRequest.client?.client_name;
        const jar = cookies();
        const sessionId = jar.get("sid")?.value;
        if (!sessionId) return redirect("/logout");

        const me = await grpc.account
            .me({
                sessionId,
            })
            .catch((_) => {
                redirect("/logout");
            });

        if (!me.student || !me.account?.publicId) {
            throw new Error("Something went wrong");
        }

        const student = me.student;

        studentId = student.studentId;
        if (student.firstNameTh && student.familyNameTh) {
            studentName = `${student.firstNameTh} ${student.familyNameTh}`;
        }

        if (consentRequest.subject !== me.account.publicId) {
            await hydra
                .rejectOAuth2ConsentRequest({
                    consentChallenge: challenge,
                    rejectOAuth2Request: {
                        error: "access_denied",
                        error_description:
                            "session not match with consent request subject",
                    },
                })
                .then(({ data: body }) => {
                    redirect(body.redirect_to);
                });
        }

        if (consentRequest.skip ?? consentRequest.client?.skip_consent) {
            const { id_token } = createOAuth2ConsentRequestSession(
                consentRequest,
                student,
            );

            await hydra
                .acceptOAuth2ConsentRequest({
                    consentChallenge: challenge,
                    acceptOAuth2ConsentRequest: {
                        grant_scope: grantScope,
                        session: {
                            id_token,
                        },
                    },
                })
                .then(({ data: body }) => {
                    redirect(body.redirect_to);
                });
        }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        console.error(error);
        redirect("/");
    }

    return (
        <>
            <div className="flex size-full flex-col items-center">
                <div className="absolute top-1/2 flex size-full max-w-3xl -translate-y-1/2 flex-col items-center justify-between md:h-auto md:justify-center md:px-32 lg:max-w-6xl">
                    <ConsentBox
                        appName={appName}
                        sharedResources={sharedResources}
                        studentId={studentId}
                        studentName={studentName}
                    />
                    <LoginFooter />
                </div>
            </div>
            <ESCLogoBackground />
        </>
    );
}
