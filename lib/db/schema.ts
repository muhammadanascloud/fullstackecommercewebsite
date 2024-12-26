import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";

// Cart Items Table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  productId: text("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
