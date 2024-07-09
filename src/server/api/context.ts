import { db } from "../db";

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { studentProvider } from "./provider";

export type Context = {
    headers: ReadonlyHeaders;
    cookies: ReadonlyRequestCookies;
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
    };
}

export async function createPublicContext({
    headers,
    cookies,
}: {
    headers: ReadonlyHeaders;
    cookies: ReadonlyRequestCookies;
}) {
    const ic = innerContext();

    var ctx: Context = {
        headers,
        cookies,
        ...ic,
    };

    return ctx;
}

export type PublicContext = Awaited<ReturnType<typeof createPublicContext>>;
