import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts", // Path to your schema definitions
  out: "./drizzle/migrations", // Directory to store migrations
  dialect: "postgresql", // Specify PostgreSQL as the dialect
  dbCredentials: {
    user: process.env.PGUSER || "neondb_owner", // Matches .env.local
    password: process.env.PGPASSWORD || "1rNI3PHFBiqx", // Updated password
    host: process.env.PGHOST || "ep-white-sun-a7ogye38-pooler.ap-southeast-2.aws.neon.tech", // Updated host
    port: 5432, // Default Postgres port
    database: process.env.PGDATABASE || "neondb", // Matches .env.local
  },
} satisfies Config;
