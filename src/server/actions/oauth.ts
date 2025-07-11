"use server";

import { hydra } from "@/server/api/hydra";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createOAuth2ConsentRequestSession } from "@/lib/oauth2";
import { loginStudent as cLoginStudent } from "../controller/auth";
import { me } from "../controller/auth";

export async function handleOAuthLogin(
    username: string,
    password: string,
    loginChallenge: string,
): Promise<void> {
    const res = await cLoginStudent(username, password);

    if (!res.success) {
        if (res.errors.length > 0) {
            throw new Error(res.errors[0]);
        }
        throw new Error("Something went wrong");
    }

    if (!res.data) {
        throw new Error("Invalid username or password");
    }

    if (!res.data.session || !res.data.account) {
        throw new Error("Something went wrong");
    }

    const { id: sid, expiresAt } = res.data.session;

    const subject = res.data.account?.publicId;

    const cookieStore = cookies();

    cookieStore.set("sid", sid, {
        expires: expiresAt,
        httpOnly: true,
    });

    await hydra
        .acceptOAuth2LoginRequest({
            loginChallenge: loginChallenge,
            acceptOAuth2LoginRequest: {
                subject,
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

    const sessionId = cookies().get("sid")?.value;
    if (!sessionId) return redirect("/logout");

    const meResponse = await me(sessionId);

    if (!meResponse.success) {
        const errors = meResponse.errors;
        throw new Error(errors.join(", "));
    }

    const meData = meResponse.data;

    if (!meData.student || !meData.account?.publicId) {
        throw new Error("Something went wrong");
    }

    const student = meData.student;
    const publicId = meData.account.publicId;

    if (consentRequest.subject !== publicId) {
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
    const { id_token } = await createOAuth2ConsentRequestSession(
        consentRequest,
        student,
        publicId,
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
