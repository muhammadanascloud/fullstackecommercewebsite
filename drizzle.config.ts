import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts", // Path to your schema file
  out: "./drizzle", // Directory for migration files
  dialect: "postgresql", // Define the database dialect
  dbCredentials: {
    url: process.env.POSTGRES_URL || "postgres://neondb_owner:LxWPn5FMI8qS@ep-green-firefly-a7empjo4-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require",
  },
});
