import "server-only";

import { cookies, headers } from "next/headers";
import { cache } from "react";

import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/context";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
    const heads = new Headers(headers());
    const cookieStore = cookies();
    heads.set("x-trpc-source", "rsc");

    return createTRPCContext({
        headers: heads,
        cookies: cookieStore,
    });
});

export const api = createCaller(createContext);
