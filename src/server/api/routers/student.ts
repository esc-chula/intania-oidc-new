import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { sessions, students } from "@/server/db/schema";

import { randomBytes } from "crypto";

export const studentRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx, input }) => {
        const _students = await ctx.db.select().from(students);
        return _students;
    }),

    login: publicProcedure
        .input(
            z.object({
                username: z.string(),
                password: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const cred = ctx.studentProvider.checkCredential(
                input.password,
                input.password,
            );

            if (!cred.success || !cred.data) {
                return {
                    success: false,
                    errors: cred.errors,
                };
            }

            const studentId = cred.data.studentId;

            const student = await ctx.db.query.students.findFirst({
                columns: {
                    id: true,
                },
                where: (students, { eq }) => eq(students.studentId, studentId),
            });

            var expiredAt = new Date();
            expiredAt.setDate(expiredAt.getDate() + 1);

            const sid = generateSessionId();

            await ctx.db.insert(sessions).values({
                id: sid,
                studentId: student?.id,
                expiredAt,
            });

            return {
                success: true,
                data: {
                    sid,
                    expiredAt,
                },
                errors: [],
            };
        }),

    me: protectedProcedure.query(async ({ ctx }) => {
        return ctx.student;
    }),
});

function generateSessionId() {
    return randomBytes(48).toString("base64url");
}
