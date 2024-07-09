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

export const studentRouter = createTRPCRouter({
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

            if (!student?.id) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message:
                        "student from credential provider does not exist in the database",
                });
            }

            var expiredAt = new Date();
            expiredAt.setDate(expiredAt.getDate() + 1);

            const sid = generateSessionId();

            await ctx.db.insert(sessions).values({
                id: sid,
                sessionType: "student",
                studentId: student.id,
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
        .input(
            z.object({
                id: z.number(),
                studentId: z.string().max(32).optional(),
                departmentId: z.number().optional(),
                nationalId: z.string().max(15).optional(),
                title: z.string().max(16).optional(),
                firstNameTh: z.string().max(30).optional(),
                firstNameEn: z.string().max(30).optional(),
                familyNameTh: z.string().max(60).optional(),
                familyNameEn: z.string().max(60).optional(),
                middleNameTh: z.string().max(60).optional(),
                middleNameEn: z.string().max(60).optional(),
                nicknameTh: z.string().max(30).optional(),
                nicknameEn: z.string().max(30).optional(),
                preferredPronoun: z.string().max(30).optional(),
                lineId: z.string().max(30).optional(),
                facebook: z.string().max(60).optional(),

                foodLimitations: z.string().max(100).optional(), // comma-sepearated string
                drugAllergies: z.string().max(100).optional(), // comma-sepearated string
                medicalConditions: z.string().max(100).optional(), // comma-sepearated string
                medications: z.string().max(100).optional(), // comma-sepearated string

                email: z.string().max(60).optional(),
                emailVerified: z.boolean().optional(),
                phoneNumber: z.string().max(16).optional(),
                phoneNumberVerified: z.boolean().optional(),

                birthDate: z.string().datetime().optional(),
                bloodType: z.enum(["A", "B", "AB", "O"]).optional(),
                nationalityId: z.number().optional(),
                religionId: z.number().optional(),
                shirtSize: z.string().max(15).optional(),

                currentAddressNumber: z.string().max(60).optional(),
                currentAddressProvinceId: z.number().optional(),
                currentAddressDistrictId: z.number().optional(),
                currentAddressOther: z.string().max(400).optional(),
                currentAddressLatitude: z.string().max(16).optional(),
                currentAddressLongitude: z.string().max(16).optional(),

                hometownAddressNumber: z.string().max(60).optional(),
                hometownAddressProvinceId: z.number().optional(),
                hometownAddressDistrictId: z.number().optional(),
                hometownAddressOther: z.string().max(400).optional(),
                hometownAddressLatitude: z.string().max(16).optional(),
                hometownAddressLongitude: z.string().max(16).optional(), // 6 + 9 + 1

                fatherName: z.string().max(150).optional(), // full name in english
                fatherBirthYear: z.number().optional(),
                fatherStatusId: z.number().optional(),

                motherName: z.string().max(150).optional(), // full name in english
                motherBirthYear: z.number().optional(),
                motherStatusId: z.number().optional(),

                familyStatusId: z.number().optional(),

                parent: z.enum(["Father", "Mother", "Other"]).optional(),
                parentPhoneNumber: z.string().max(16).optional(),
                parentAddress: z.string().max(400).optional(),

                siblingTotal: z.number().optional(),
                siblingOrder: z.number().optional(),

                profilePictureKey: z.string().max(30).optional(),
            }),
        )
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
