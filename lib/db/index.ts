// lib/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres"; // postgres-js library

const client = postgres(process.env.DATABASE_URL!, { ssl: "require" }); // Ensure SSL
export const db = drizzle(client); // Initialize drizzle with the client
