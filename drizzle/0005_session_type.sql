DO $$ BEGIN
 CREATE TYPE "public"."session_type" AS ENUM('student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "intania-oidc_sessions" ADD COLUMN "session_type" "session_type" NOT NULL;--> statement-breakpoint
ALTER TABLE "intania-oidc_students" DROP COLUMN IF EXISTS "parent_phone_number";--> statement-breakpoint
ALTER TABLE "intania-oidc_students" DROP COLUMN IF EXISTS "parent_address";