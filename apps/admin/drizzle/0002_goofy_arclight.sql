ALTER TABLE "departments" DROP CONSTRAINT "departments_company_id_companies_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" ALTER COLUMN "company_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;