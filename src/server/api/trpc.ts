/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { PublicContext } from "./context";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<PublicContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Auth procedure
 *
 * This is procedure that already check for user authenticity.
 */
export const protectedProcedure = t.procedure.use(
    async function isAuthed(opts) {
        const { ctx } = opts;

        const sid = ctx.cookies.get("sid");

        const session = await getSessionFromCookie(ctx, sid);

        switch (session.code) {
            case "INVALID_COOKIE":
            case "EMPTY":
                throw new TRPCError({ code: "UNAUTHORIZED" });
            case "SUCCESS":
                return opts.next({
                    ctx: {
                        ...ctx,
                        session: session.data,
                        // Safety note: already check undefined in `getSessionFromCookie`
                        sessionId: (sid as RequestCookie).value,
                    },
                });
        }
    },
);

type CheckSessionResult =
    | {
          code: "INVALID_COOKIE";
      }
    | {
          code: "SUCCESS";
          data: {
              sessionType: "student";
              studentId: number;
          };
      }
    | {
          code: "EMPTY";
      };

async function getSessionFromCookie(
    ctx: PublicContext,
    sid: RequestCookie | undefined,
): Promise<CheckSessionResult> {
    if (!sid) {
        return {
            code: "EMPTY",
        };
    }

    const session = await ctx.db.query.sessions.findFirst({
        where: (session, { eq, and, gt, not }) =>
            and(
                eq(session.id, sid.value),
                not(session.revoked),
                gt(session.expiredAt, new Date()),
            ),
    });

    if (!session) {
        return {
            code: "INVALID_COOKIE",
        };
    }

    switch (session.sessionType) {
        case "student":
            if (!session.studentId) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "session type does not match",
                });
            }
            return {
                code: "SUCCESS",
                data: {
                    sessionType: session.sessionType,
                    studentId: session.studentId,
                },
            };
    }
}
