import { index, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    referenceCode: text("reference_code").notNull().unique(),
    requestType: text("request_type").notNull(),
    collegeName: text("college_name").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    studentsYear: text("students_year").notNull(),
    programInterest: text("program_interest").notNull(),
    batchSize: integer("batch_size").notNull(),
    placementSeason: text("placement_season").notNull(),
    contactName: text("contact_name").notNull(),
    designation: text("designation").notNull(),
    phone: text("phone").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull().default(""),
    sourcePath: text("source_path").notNull(),
    ipHash: text("ip_hash").notNull(),
    userAgent: text("user_agent").notNull().default(""),
    consentGivenAt: timestamp("consent_given_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (leadsTable) => [index("leads_ip_hash_created_at_idx").on(leadsTable.ipHash, leadsTable.createdAt)],
);

export type NewLead = typeof leads.$inferInsert;
