// lib/db/schema.ts
import {
    pgTable,
    serial,
    integer,
    varchar,
    timestamp,
    uuid,
  } from "drizzle-orm/pg-core";
  import { sql } from "drizzle-orm";
  
  // 1) CARTS TABLE
  export const carts = pgTable("carts", {
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // 2) CART ITEMS TABLE
  export const cartItems = pgTable("cart_items", {
    id: serial("id").primaryKey(),
    cartId: uuid("cart_id")
      .notNull()
      // If you need a foreign key constraint in Postgres:
      // .references(() => carts.id, { onDelete: "cascade" })
      ,
    productId: varchar("product_id", { length: 256 }).notNull(),
    quantity: integer("quantity").notNull().default(1),
    // For demonstration, we store product name and price.
    // In reality, you might join with your products table or fetch from CMS
    productName: varchar("product_name", { length: 256 }).notNull(),
    productPrice: integer("product_price").notNull(),
  });
  