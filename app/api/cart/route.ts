// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { carts, cartItems } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

////////////////////////////////////////////////////////////////////////////////
// POST /api/cart - Add an item to the cart
////////////////////////////////////////////////////////////////////////////////
export async function POST(req: NextRequest) {
  try {
    const { userId, productId, productName, productPrice, quantity } = await req.json();

    // 1) Find or create a cart for user/guest
    let [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    if (!cart) {
      const insertResult = await db
        .insert(carts)
        .values({ userId })
        .returning();
      cart = insertResult[0];
    }

    // 2) Check if this product is already in the cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId))
      );

    if (existingItem) {
      // Update the quantity if item already exists
      await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + (quantity || 1) })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      // Insert a new cart item
      await db.insert(cartItems).values({
        cartId: cart.id,
        productId,
        productName,
        productPrice,
        quantity: quantity || 1,
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/cart] error:", error);
    return NextResponse.json({ error: "Error adding item to cart" }, { status: 500 });
  }
}

////////////////////////////////////////////////////////////////////////////////
// GET /api/cart - Retrieve the cart items
////////////////////////////////////////////////////////////////////////////////
export async function GET(req: NextRequest) {
  try {
    // e.g. /api/cart?userId=abc123
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    // 1) Find the cart for this user
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    if (!cart) {
      // If no cart, return empty array
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    // 2) Fetch cart items
    const items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.cartId, cart.id));

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/cart] error:", error);
    return NextResponse.json({ error: "Error fetching cart" }, { status: 500 });
  }
}

////////////////////////////////////////////////////////////////////////////////
// PATCH /api/cart - Update the quantity of a cart item
////////////////////////////////////////////////////////////////////////////////
export async function PATCH(req: NextRequest) {
  try {
    const { userId, productId, quantity } = await req.json();

    // 1) Find the cart for this user
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // 2) Find the specific cart item
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId))
      );

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
    }

    // 3) Update item quantity
    await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, existingItem.id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[PATCH /api/cart] error:", error);
    return NextResponse.json({ error: "Error updating cart item" }, { status: 500 });
  }
}

////////////////////////////////////////////////////////////////////////////////
// DELETE /api/cart - Remove an item from the cart
////////////////////////////////////////////////////////////////////////////////
export async function DELETE(req: NextRequest) {
  try {
    // e.g. body: { userId: "abc123", productId: "p1" }
    const { userId, productId } = await req.json();

    // 1) Find the cart
    const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // 2) Remove the cart item
    await db
      .delete(cartItems)
      .where(
        and(eq(cartItems.cartId, cart.id), eq(cartItems.productId, productId))
      );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/cart] error:", error);
    return NextResponse.json({ error: "Error removing item" }, { status: 500 });
  }
}
