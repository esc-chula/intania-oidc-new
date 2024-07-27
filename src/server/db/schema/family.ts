import { sql } from "drizzle-orm";
import { serial, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createTable } from "./lib/table";

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
