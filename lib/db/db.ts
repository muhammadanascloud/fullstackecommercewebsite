import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { cartItems } from "./schema";

export const db = drizzle(sql, { schema: { cartItems } });
