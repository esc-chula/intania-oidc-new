"use server";

import { api } from "@/trpc/server";
import { hydra } from "@/server/api/hydra";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { type Student } from "@/types/student";
import { createOAuth2ConsentRequestSession } from "@/lib/utils";

export async function handleOAuthLogin(
    username: string,
    password: string,
    loginChallenge: string,
): Promise<void> {
    const res = await api.student.login({ username, password });

    if (!res.success) {
        if (res.errors.length > 0) {
            throw new Error(res.errors[0]);
        }
        throw new Error("Something went wrong");
    }

    if (!res.data) {
        throw new Error("Invalid username or password");
    }

    const { sid, expiredAt, internalId } = res.data;

    const cookieStore = cookies();
    cookieStore.set("sid", sid, {
        expires: expiredAt,
        httpOnly: true,
    });

    await hydra
        .acceptOAuth2LoginRequest({
            loginChallenge: loginChallenge,
            acceptOAuth2LoginRequest: {
                subject: internalId.toString(),
            },
        })
        .then(({ data }) => {
            redirect(data.redirect_to);
        });
}

export async function handleOAuthAcceptConsent(
    consentChallenge: string,
): Promise<void> {
    const { data: consentRequest } = await hydra.getOAuth2ConsentRequest({
        consentChallenge: consentChallenge,
    });
    const grantScope: string[] = consentRequest.requested_scope ?? [];

    const student = (await api.student.me()) as Student;

    if (consentRequest.subject !== student.id.toString()) {
        await hydra
            .rejectOAuth2ConsentRequest({
                consentChallenge: consentChallenge,
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
    const { id_token } = createOAuth2ConsentRequestSession(
        consentRequest,
        student,
    );

    await hydra
        .acceptOAuth2ConsentRequest({
            consentChallenge: consentChallenge,
            acceptOAuth2ConsentRequest: {
                remember: true,
                remember_for: 0,
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

export async function handleOAuthRejectConsent(
    consentChallenge: string,
): Promise<void> {
    await hydra
        .rejectOAuth2ConsentRequest({
            consentChallenge: consentChallenge,
            rejectOAuth2Request: {
                error: "request_rejected",
            },
        })
        .then(({ data: body }) => {
            redirect(body.redirect_to);
        });
}
