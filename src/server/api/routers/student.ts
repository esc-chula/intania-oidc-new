import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { sessions, students } from "@/server/db/schema";

import { randomBytes } from "crypto";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { studentDto } from "../dto";

export const studentRouter = createTRPCRouter({
    login: publicProcedure
        .input(
            z.object({
                username: z.string(),
                password: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const cred = await ctx.studentProvider.checkCredential(
                input.username,
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
            let internalId = student?.id;

            if (!internalId) {
                const result = (
                    await ctx.db
                        .insert(students)
                        .values({
                            studentId,
                        })
                        .returning()
                )[0];
                if (!result) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "create user but does not appear",
                    });
                }
                internalId = result.id;
            }

            const expiredAt = new Date();
            expiredAt.setDate(expiredAt.getDate() + 1);

            const sid = generateSessionId();

            await ctx.db.insert(sessions).values({
                id: sid,
                sessionType: "student",
                studentId: internalId,
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
        const student = await ctx.db.query.students.findFirst({
            where: (student, { eq }) => eq(student.id, ctx.session.studentId),
        });

        if (!student) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "session is valid but student is not",
            });
        }

        return student;
    }),

    update: protectedProcedure
        .input(studentDto)
        .mutation(async ({ ctx, input }) => {
            const id = input.id;

            return await ctx.db
                .update(students)
                .set({ ...input, updatedAt: new Date(), id: undefined })
                .where(eq(students.id, id));
        }),
    getMiscInfo: publicProcedure.query(async ({ ctx }) => {
        const countries = await ctx.db.query.countries.findMany();
        const religions = await ctx.db.query.religions.findMany();
        const engineeringDepartments =
            await ctx.db.query.engineeringDepartments.findMany();
        const familyMemberStatuses =
            await ctx.db.query.familyMemberStatuses.findMany();
        const familyStatuses = await ctx.db.query.familyStatuses.findMany();
        const thaiDistricts = await ctx.db.query.thaiDistricts.findMany();
        const thaiProvinces = await ctx.db.query.thaiProvinces.findMany();
        return {
            countries,
            religions,
            engineeringDepartments,
            familyMemberStatuses,
            familyStatuses,
            thaiDistricts,
            thaiProvinces,
        };
    }),
});

function generateSessionId() {
    return randomBytes(48).toString("base64url");
}
