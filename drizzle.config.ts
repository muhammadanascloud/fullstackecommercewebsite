import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts", // Path to your schema definitions
  out: "./drizzle/migrations", // Directory to store migrations
  dialect: "postgresql", // Specify PostgreSQL as the dialect
  dbCredentials: {
    user: process.env.PGUSER || "neondb_owner",
    password: process.env.PGPASSWORD || "LxWPn5FMI8qS",
    host: process.env.PGHOST || "ep-green-firefly-a7empjo4-pooler.ap-southeast-2.aws.neon.tech",
    port: 5432, // Default Postgres port
    database: process.env.PGDATABASE || "neondb",
  },
} satisfies Config;
