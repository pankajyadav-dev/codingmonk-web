CREATE TABLE "leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reference_code" text NOT NULL,
	"request_type" text NOT NULL,
	"college_name" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"students_year" text NOT NULL,
	"program_interest" text NOT NULL,
	"batch_size" integer NOT NULL,
	"placement_season" text NOT NULL,
	"contact_name" text NOT NULL,
	"designation" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"message" text DEFAULT '' NOT NULL,
	"source_path" text NOT NULL,
	"ip_hash" text NOT NULL,
	"user_agent" text DEFAULT '' NOT NULL,
	"consent_given_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "leads_reference_code_unique" UNIQUE("reference_code")
);
--> statement-breakpoint
CREATE INDEX "leads_ip_hash_created_at_idx" ON "leads" USING btree ("ip_hash","created_at");