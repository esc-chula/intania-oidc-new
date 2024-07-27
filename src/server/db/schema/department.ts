import { sql } from "drizzle-orm";
import { serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "./lib/table";

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
