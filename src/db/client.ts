import "server-only";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzleNeon<typeof schema>> | ReturnType<typeof drizzlePglite<typeof schema>>;

let databasePromise: Promise<Database> | undefined;

async function connectToLocalDatabase() {
  const { PGlite } = await import("@electric-sql/pglite");
  const localDataDirectory = process.env.PGLITE_DATA_DIR ?? path.join(process.cwd(), ".data", "pglite");
  mkdirSync(localDataDirectory, { recursive: true });
  const localDatabase = drizzlePglite(new PGlite(localDataDirectory), { schema });
  await migratePglite(localDatabase, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  return localDatabase;
}

export function getDatabase(): Promise<Database> {
  databasePromise ??= process.env.DATABASE_URL
    ? Promise.resolve(drizzleNeon(neon(process.env.DATABASE_URL), { schema }))
    : connectToLocalDatabase();
  return databasePromise;
}
