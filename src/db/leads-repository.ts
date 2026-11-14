import "server-only";
import { and, count, eq, gte } from "drizzle-orm";
import { getDatabase } from "./client";
import { leads, type NewLead } from "./schema";

export async function countRecentLeadsFromNetwork(ipHash: string, since: Date) {
  const database = await getDatabase();
  const [result] = await database
    .select({ leadCount: count() })
    .from(leads)
    .where(and(eq(leads.ipHash, ipHash), gte(leads.createdAt, since)));
  return result?.leadCount ?? 0;
}

export async function saveLead(newLead: NewLead) {
  const database = await getDatabase();
  await database.insert(leads).values(newLead);
}
