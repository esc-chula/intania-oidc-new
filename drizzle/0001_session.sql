CREATE TABLE IF NOT EXISTS "intania-oidc_sessions" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"student_id" integer,
	"revoked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_sessions" ADD CONSTRAINT "intania-oidc_sessions_student_id_intania-oidc_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."intania-oidc_students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
