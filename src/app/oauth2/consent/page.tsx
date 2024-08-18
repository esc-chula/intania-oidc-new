import ESCLogoBackground from "@/components/esc/esc-logo-background";
import LoginFooter from "@/components/login/login-footer";
import { redirect } from "next/navigation";
import { hydra } from "@/server/api/hydra";
import { isRedirectError } from "next/dist/client/components/redirect";
import { type Student } from "@/types/student";
import { api } from "@/trpc/server";
import ConsentBox from "@/components/oauth2/consent-box";
import {
    createOAuth2ConsentRequestSession,
    getSharedResourcesFromScope,
} from "@/lib/utils";

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
        await hydra
            .getOAuth2ConsentRequest({ consentChallenge: challenge })
            .then(async ({ data: consentRequest }) => {
                const grantScope: string[] =
                    consentRequest.requested_scope ?? [];
                sharedResources = getSharedResourcesFromScope(grantScope);
                appName = consentRequest.client?.client_name;

                const student = (await api.student.me()) as Student;
                studentId = student.studentId;
                if (student.firstNameTh && student.familyNameTh) {
                    studentName = `${student.firstNameTh} ${student.familyNameTh}`;
                }

                if (consentRequest.subject !== student.id.toString()) {
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
                    return;
                }

                if (
                    consentRequest.skip ??
                    consentRequest.client?.skip_consent
                ) {
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
            });
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
