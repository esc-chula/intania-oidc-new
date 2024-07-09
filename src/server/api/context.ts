import * as trpcNext from "@trpc/server/adapters/next";
import { db } from "../db";

import * as schema from "@/server/db/schema";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export type Context = {
    headers: ReadonlyHeaders;
    cookies: ReadonlyRequestCookies;
    student?: typeof schema.students.$inferSelect;
} & InnerContext;

export type InnerContext = {
    studentProvider: typeof studentProvider;
    db: typeof db;
};

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */

export function innerContext() {
    return {
        db,
        studentProvider,
    }
}

export async function createTRPCContext({ headers, cookies }: { headers: ReadonlyHeaders, cookies: ReadonlyRequestCookies }) {
    const ic = innerContext();

    var ctx: Context = {
        headers,
        cookies,
        ...ic,
    };
    async function getUserFromCookie() {
        const sid = cookies.get("sid");

        if (!sid) {
            return null;
        }

        const session = await db.query.sessions.findFirst({
            where: (session, { eq }) => eq(session.id, sid.value),
            with: {
                student: true,
            },
        });

        console.log({ session })

        return session?.student;
    }

    const student = await getUserFromCookie();

    console.log({ student });

    if (student) {
        ctx.student = student;
    }

    return ctx;
}

export type CreateTRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

export type StudentInfo = {
    studentId: string;
};

export type ValidationResponse = {
    success: boolean;
    data?: StudentInfo;
    errors: string[];
};

const studentProvider = {
    checkCredential(username: string, password: string): ValidationResponse {
        // TODO: Check with chula
        if (username == password) {
            return {
                success: true,
                data: {
                    studentId: username,
                },
                errors: [],
            };
        } else {
            return {
                success: false,
                errors: ["Incorret password"],
            };
        }
    },
};
