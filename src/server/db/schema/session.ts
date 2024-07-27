import { sql, relations } from "drizzle-orm";
import {
    varchar,
    integer,
    boolean,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";
import { createTable } from "./lib/table";
import { students } from "./student";

export const sessionTypes = pgEnum("session_type", ["student"]);

export const sessions = createTable("sessions", {
    id: varchar("id", { length: 64 }).primaryKey(),
    sessionType: sessionTypes("session_type").notNull(),
    studentId: integer("student_id").references(() => students.id),
    revoked: boolean("revoked").default(false).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
    expiredAt: timestamp("expired_at", { withTimezone: true }).notNull(),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
    student: one(students, {
        fields: [sessions.studentId],
        references: [students.id],
    }),
}));
