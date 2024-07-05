DO $$ BEGIN
 CREATE TYPE "public"."blood_type" AS ENUM('A', 'B', 'AB', 'o');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."parents" AS ENUM('Father', 'Mother', 'Other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" char(2),
	"name" varchar(60),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_engineering_departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_th" varchar(80),
	"name_en" varchar(80),
	"code" varchar(10),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_family_member_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"value_th" varchar(30),
	"value_en" varchar(30),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_family_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"value_th" varchar(30),
	"value_en" varchar(30),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_religions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_th" varchar(30),
	"name_en" varchar(30),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_students" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar(32),
	"department_id" integer,
	"national_id" varchar(15),
	"title" varchar(16),
	"first_name_th" varchar(30),
	"first_name_en" varchar(30),
	"family_name_th" varchar(60),
	"family_name_en" varchar(60),
	"middle_name_th" varchar(60),
	"middle_name_en" varchar(60),
	"nickname_th" varchar(30),
	"nickname_en" varchar(30),
	"preferred_pronoun" varchar(30),
	"line_id" varchar(30),
	"facebook" varchar(60),
	"food_limitations" varchar(100),
	"drug_allergies" varchar(100),
	"medical_conditions" varchar(100),
	"medications" varchar(100),
	"email" varchar(60),
	"email_verified" boolean DEFAULT false,
	"phone_number" varchar(16),
	"phone_number_verified" boolean DEFAULT false,
	"birth_date" date,
	"blood_type" "blood_type",
	"nationality_id" integer,
	"religion_id" integer,
	"shirt_size" varchar(15),
	"current_address_number" varchar(60),
	"current_address_province_id" integer,
	"current_address_district_id" integer,
	"current_address_other" varchar(400),
	"current_address_latitude" numeric(9, 6),
	"current_address_longitude" numeric(9, 6),
	"hometown_address_number" varchar(60),
	"hometown_address_province_id" integer,
	"hometown_address_district_id" integer,
	"hometown_address_other" varchar(400),
	"hometown_address_latitude" numeric(9, 6),
	"hometown_address_longitude" numeric(9, 6),
	"father_name" varchar(150),
	"father_birth_year" smallint,
	"father_status_id" integer,
	"mother_name" varchar(150),
	"mother_birth_year" smallint,
	"mother_status_id" integer,
	"family_status_id" integer,
	"parent" "parents",
	"sibling_total" smallint,
	"sibling_order" smallint,
	"profile_picture_key" varchar(30),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_thai_districts" (
	"id" serial PRIMARY KEY NOT NULL,
	"province_code" smallint,
	"disctrict_code" smallint,
	"postal_code" integer,
	"name_th" varchar(40),
	"name_en" varchar(40),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "intania-oidc_thai_districts_disctrict_code_unique" UNIQUE("disctrict_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "intania-oidc_thai_provinces" (
	"id" serial PRIMARY KEY NOT NULL,
	"province_code" smallint,
	"name_th" varchar(40),
	"name_en" varchar(40),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "intania-oidc_thai_provinces_province_code_unique" UNIQUE("province_code")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_department_id_intania-oidc_engineering_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."intania-oidc_engineering_departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_nationality_id_intania-oidc_countries_id_fk" FOREIGN KEY ("nationality_id") REFERENCES "public"."intania-oidc_countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_religion_id_intania-oidc_religions_id_fk" FOREIGN KEY ("religion_id") REFERENCES "public"."intania-oidc_religions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_current_address_province_id_intania-oidc_thai_provinces_id_fk" FOREIGN KEY ("current_address_province_id") REFERENCES "public"."intania-oidc_thai_provinces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_current_address_district_id_intania-oidc_thai_districts_id_fk" FOREIGN KEY ("current_address_district_id") REFERENCES "public"."intania-oidc_thai_districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_hometown_address_province_id_intania-oidc_thai_provinces_id_fk" FOREIGN KEY ("hometown_address_province_id") REFERENCES "public"."intania-oidc_thai_provinces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_hometown_address_district_id_intania-oidc_thai_districts_id_fk" FOREIGN KEY ("hometown_address_district_id") REFERENCES "public"."intania-oidc_thai_districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_father_status_id_intania-oidc_family_member_statuses_id_fk" FOREIGN KEY ("father_status_id") REFERENCES "public"."intania-oidc_family_member_statuses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_mother_status_id_intania-oidc_family_member_statuses_id_fk" FOREIGN KEY ("mother_status_id") REFERENCES "public"."intania-oidc_family_member_statuses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_students" ADD CONSTRAINT "intania-oidc_students_family_status_id_intania-oidc_family_statuses_id_fk" FOREIGN KEY ("family_status_id") REFERENCES "public"."intania-oidc_family_statuses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "intania-oidc_thai_districts" ADD CONSTRAINT "intania-oidc_thai_districts_province_code_intania-oidc_thai_provinces_province_code_fk" FOREIGN KEY ("province_code") REFERENCES "public"."intania-oidc_thai_provinces"("province_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "student_id_idx" ON "intania-oidc_students" ("student_id");