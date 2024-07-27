import { relations, sql } from "drizzle-orm";
import {
    char,
    integer,
    pgEnum,
    serial,
    smallint,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { createTable } from "./lib/table";

export const bloodTypes = pgEnum("blood_type", ["A", "B", "AB", "O"]);

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

export const thaiDistrictRelations = relations(thaiDistricts, ({ one }) => ({
    province: one(thaiProvinces, {
        fields: [thaiDistricts.provinceCode],
        references: [thaiProvinces.provinceCode],
    }),
}));

export const thaiProvinceRelations = relations(thaiProvinces, ({ many }) => ({
    districts: many(thaiDistricts),
}));
