// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
    index,
    serial,
    timestamp,
    varchar,
    boolean,
    integer,
    date,
    smallint,
    numeric,
} from "drizzle-orm/pg-core";
import { createTable } from "./lib/table";
import { familyMemberStatuses, familyStatuses, parent } from "./family";
import { engineeringDepartments } from "./department";
import {
    bloodTypes,
    countries,
    religions,
    thaiDistricts,
    thaiProvinces,
} from "./common";

export const students = createTable(
    "students",
    {
        id: serial("id").primaryKey(),
        studentId: varchar("student_id", { length: 32 }),
        departmentId: integer("department_id").references(
            () => engineeringDepartments.id,
        ),
        nationalId: varchar("national_id", { length: 15 }),

        titleTh: varchar("title_th", { length: 30 }),
        titleEn: varchar("title_en", { length: 30 }),
        firstNameTh: varchar("first_name_th", { length: 90 }),
        firstNameEn: varchar("first_name_en", { length: 90 }),
        familyNameTh: varchar("family_name_th", { length: 90 }),
        familyNameEn: varchar("family_name_en", { length: 90 }),
        middleNameTh: varchar("middle_name_th", { length: 90 }),
        middleNameEn: varchar("middle_name_en", { length: 90 }),
        nicknameTh: varchar("nickname_th", { length: 50 }),
        nicknameEn: varchar("nickname_en", { length: 50 }),
        preferredPronoun: varchar("preferred_pronoun", { length: 50 }),
        lineId: varchar("line_id", { length: 30 }),
        facebook: varchar("facebook", { length: 60 }),

        foodLimitations: varchar("food_limitations", { length: 200 }), // comma-sepearated string
        drugAllergies: varchar("drug_allergies", { length: 200 }), // comma-sepearated string
        medicalConditions: varchar("medical_conditions", { length: 200 }), // comma-sepearated string
        medications: varchar("medications", { length: 200 }), // comma-sepearated string

        email: varchar("email", { length: 90 }),
        emailVerified: boolean("email_verified").default(false),
        phoneNumber: varchar("phone_number", { length: 16 }),
        phoneNumberVerified: boolean("phone_number_verified").default(false),

        birthDate: date("birth_date"),
        bloodType: bloodTypes("blood_type"),
        nationalityId: integer("nationality_id").references(() => countries.id),
        religionId: integer("religion_id").references(() => religions.id),
        shirtSize: integer("shirt_size"), // shirt size in inches

        currentAddressNumber: varchar("current_address_number", { length: 60 }),
        currentAddressProvinceId: integer(
            "current_address_province_id",
        ).references(() => thaiProvinces.id),
        currentAddressDistrictId: integer(
            "current_address_district_id",
        ).references(() => thaiDistricts.id),
        currentAddressOther: varchar("current_address_other", { length: 400 }),
        currentAddressLatitude: numeric("current_address_latitude", {
            precision: 9,
            scale: 6,
        }),
        currentAddressLongitude: numeric("current_address_longitude", {
            precision: 9,
            scale: 6,
        }),

        hometownAddressNumber: varchar("hometown_address_number", {
            length: 60,
        }),
        hometownAddressProvinceId: integer(
            "hometown_address_province_id",
        ).references(() => thaiProvinces.id),
        hometownAddressDistrictId: integer(
            "hometown_address_district_id",
        ).references(() => thaiDistricts.id),
        hometownAddressOther: varchar("hometown_address_other", {
            length: 400,
        }),
        hometownAddressLatitude: numeric("hometown_address_latitude", {
            precision: 9,
            scale: 6,
        }),
        hometownAddressLongitude: numeric("hometown_address_longitude", {
            precision: 9,
            scale: 6,
        }),

        fatherName: varchar("father_name", { length: 300 }), // full name in english
        fatherBirthYear: smallint("father_birth_year"),
        fatherStatusId: integer("father_status_id").references(
            () => familyMemberStatuses.id,
        ),
        motherName: varchar("mother_name", { length: 300 }), // full name in english
        motherBirthYear: smallint("mother_birth_year"),
        motherStatusId: integer("mother_status_id").references(
            () => familyMemberStatuses.id,
        ),
        familyStatusId: integer("family_status_id").references(
            () => familyStatuses.id,
        ),
        parent: parent("parent"),
        parentPhoneNumber: varchar("parent_phone_number", { length: 16 }),
        parentAddress: varchar("parent_address", { length: 400 }),

        siblingTotal: smallint("sibling_total"),
        siblingOrder: smallint("sibling_order"),

        profilePictureKey: varchar("profile_picture_key", { length: 30 }),

        cueaDataTransferAgreement: boolean(
            "cuea_data_transfer_agreement",
        ).default(false),

        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }),
    },
    (table) => ({
        studentIdIdx: index("student_id_idx").on(table.studentId),
    }),
);

export const studentRelations = relations(students, ({ one, many }) => ({
    nationality: one(countries, {
        fields: [students.nationalityId],
        references: [countries.id],
    }),
    religion: one(religions, {
        fields: [students.religionId],
        references: [religions.id],
    }),
    fatherStatus: one(familyMemberStatuses, {
        fields: [students.fatherStatusId],
        references: [familyMemberStatuses.id],
    }),
    motherStatus: one(familyMemberStatuses, {
        fields: [students.motherStatusId],
        references: [familyMemberStatuses.id],
    }),
    familyStatuses: one(familyStatuses, {
        fields: [students.familyStatusId],
        references: [familyStatuses.id],
    }),
    currentAddressProvince: one(thaiProvinces, {
        fields: [students.currentAddressProvinceId],
        references: [thaiProvinces.id],
    }),
    currentAddressDistrict: one(thaiDistricts, {
        fields: [students.currentAddressDistrictId],
        references: [thaiDistricts.id],
    }),
    hometownAddressProvince: one(thaiProvinces, {
        fields: [students.hometownAddressProvinceId],
        references: [thaiProvinces.id],
    }),
    hometownAddressDistrict: one(thaiDistricts, {
        fields: [students.hometownAddressDistrictId],
        references: [thaiDistricts.id],
    }),
}));
