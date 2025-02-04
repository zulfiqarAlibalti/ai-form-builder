CREATE TABLE IF NOT EXISTS "jsonForms" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonform" text NOT NULL,
	"theme" varchar,
	"background" varchar,
	"style" varchar,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"enabledSignIn" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userResponses" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonResponse" text NOT NULL,
	"createdBy" varchar DEFAULT 'anonymus',
	"createdAt" varchar NOT NULL,
	"formRef" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userResponses" ADD CONSTRAINT "userResponses_formRef_jsonForms_id_fk" FOREIGN KEY ("formRef") REFERENCES "public"."jsonForms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
