import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("database url is not set");
}

async function runMigration() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);

    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("All migrations are successfully done");
  } catch (error) {
    console.log("Migrations failed", error);
    process.exit(0);
  }
}

runMigration();
