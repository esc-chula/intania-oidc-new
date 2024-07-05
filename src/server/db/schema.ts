// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
    index,
    pgTableCreator,
    serial,
    timestamp,
    varchar,
    boolean,
    pgEnum,
    char,
    integer,
    date,
    smallint,
    numeric,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `intania-oidc_${name}`);

export const bloodTypes = pgEnum("blood_type", ["A", "B", "AB", "o"]);

export const parent = pgEnum("parents", ["Father", "Mother", "Other"]);

export const familyMemberStatuses = createTable("family_member_statuses", {
    id: serial("id").primaryKey(),
    valueTh: varchar("value_th", { length: 30 }),
    valueEn: varchar("value_en", { length: 30 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const familyStatuses = createTable("family_statuses", {
    id: serial("id").primaryKey(),
    valueTh: varchar("value_th", { length: 30 }),
    valueEn: varchar("value_en", { length: 30 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const countries = createTable("countries", {
    id: serial("id").primaryKey(),
    code: char("code", { length: 2 }),
    name: varchar("name", { length: 60 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const religions = createTable("religions", {
    id: serial("id").primaryKey(),
    nameTh: varchar("name_th", { length: 30 }),
    nameEn: varchar("name_en", { length: 30 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const thaiProvinces = createTable("thai_provinces", {
    id: serial("id").primaryKey(),
    provinceCode: smallint("province_code").unique(),
    nameTh: varchar("name_th", { length: 40 }),
    nameEn: varchar("name_en", { length: 40 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const thaiDistricts = createTable("thai_districts", {
    id: serial("id").primaryKey(),
    provinceCode: smallint("province_code").references(
        () => thaiProvinces.provinceCode,
    ),
    districtCode: smallint("disctrict_code").unique(),
    postalCode: integer("postal_code"),
    nameTh: varchar("name_th", { length: 40 }),
    nameEn: varchar("name_en", { length: 40 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const engineeringDepartments = createTable("engineering_departments", {
    id: serial("id").primaryKey(),
    nameTh: varchar("name_th", { length: 80 }),
    nameEn: varchar("name_en", { length: 80 }),
    code: varchar("code", { length: 10 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const students = createTable(
    "students",
    {
        id: serial("id").primaryKey(),
        studentId: varchar("student_id", { length: 32 }),
        departmentId: integer("department_id").references(
            () => engineeringDepartments.id,
        ),
        nationalId: varchar("national_id", { length: 15 }),

        title: varchar("title", { length: 16 }),
        firstNameTh: varchar("first_name_th", { length: 30 }),
        firstNameEn: varchar("first_name_en", { length: 30 }),
        familyNameTh: varchar("family_name_th", { length: 60 }),
        familyNameEn: varchar("family_name_en", { length: 60 }),
        middleNameTh: varchar("middle_name_th", { length: 60 }),
        middleNameEn: varchar("middle_name_en", { length: 60 }),
        nicknameTh: varchar("nickname_th", { length: 30 }),
        nicknameEn: varchar("nickname_en", { length: 30 }),
        preferredPronoun: varchar("preferred_pronoun", { length: 30 }),
        lineId: varchar("line_id", { length: 30 }),
        facebook: varchar("facebook", { length: 60 }),

        foodLimitations: varchar("food_limitations", { length: 100 }), // comma-sepearated string
        drugAllergies: varchar("drug_allergies", { length: 100 }), // comma-sepearated string
        medicalConditions: varchar("medical_conditions", { length: 100 }), // comma-sepearated string
        medications: varchar("medications", { length: 100 }), // comma-sepearated string

        email: varchar("email", { length: 60 }),
        emailVerified: boolean("email_verified").default(false),
        phoneNumber: varchar("phone_number", { length: 16 }),
        phoneNumberVerified: boolean("phone_number_verified").default(false),

        birthDate: date("birth_date"),
        bloodTypeId: bloodTypes("blood_type"),
        nationalityId: integer("nationality_id").references(() => countries.id),
        religionId: integer("religion_id").references(() => religions.id),
        shirtSize: varchar("shirt_size", { length: 15 }),

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

        fatherName: varchar("father_name", { length: 150 }), // full name in english
        fatherBirthYear: smallint("father_birth_year"),
        fatherStatusId: integer("father_status_id").references(
            () => familyMemberStatuses.id,
        ),
        motherName: varchar("mother_name", { length: 150 }), // full name in english
        motherBirthYear: smallint("mother_birth_year"),
        motherStatusId: integer("mother_status_id").references(
            () => familyMemberStatuses.id,
        ),
        familyStatusId: integer("family_status_id").references(
            () => familyStatuses.id,
        ),
        parent: parent("parent"),
        parentPhoneNumber: varchar("phone_number", { length: 16 }),
        parentAddress: varchar("hometown_address_other", { length: 400 }),

        siblingTotal: smallint("sibling_total"),
        siblingOrder: smallint("sibling_order"),

        profilePictureKey: varchar("profile_picture_key", { length: 30 }),

        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }),
    },
    (table) => ({
        studentIdIdx: index("student_id_idx").on(table.studentId),
    }),
);

export const studentRelations = relations(students, ({ one }) => ({
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

export const thaiDistrictRelations = relations(thaiDistricts, ({ one }) => ({
    province: one(thaiProvinces, {
        fields: [thaiDistricts.provinceCode],
        references: [thaiProvinces.provinceCode],
    }),
}));

export const thaiProvinceRelations = relations(thaiProvinces, ({ many }) => ({
    districts: many(thaiDistricts),
}));
