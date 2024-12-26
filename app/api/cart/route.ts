import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { cartItems } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

// GET: Fetch cart items with product details
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required to fetch cart items" },
      { status: 400 }
    );
  }

  try {
    // Use a raw SQL query as a fallback for `.join`
    const items = await db.execute(
      sql`
      SELECT
        ci.id AS id,
        ci.quantity AS quantity,
        p.name AS name,
        p.price AS price,
        p.image AS image
      FROM cart_items AS ci
      INNER JOIN products AS p
      ON ci.product_id = p.id
      WHERE ci.user_id = ${userId}
    `
    );

    return NextResponse.json(items.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart items", error },
      { status: 500 }
    );
  }
}


// POST: Add an item to the cart
export async function POST(req: NextRequest) {
  try {
    const { userId, productId, quantity } = await req.json();

    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { message: "Missing required fields: userId, productId, quantity" },
        { status: 400 }
      );
    }

    await db.insert(cartItems).values({
      userId,
      productId,
      quantity,
    });

    return NextResponse.json({ message: "Item added to cart" }, { status: 201 });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Failed to add item to cart", error },
      { status: 500 }
    );
  }
}

// PATCH: Update the quantity of an item in the cart
export async function PATCH(req: NextRequest) {
  try {
    const { cartItemId, newQuantity } = await req.json();

    if (!cartItemId || !newQuantity) {
      return NextResponse.json(
        { message: "Missing required fields: cartItemId, newQuantity" },
        { status: 400 }
      );
    }

    await db
      .update(cartItems)
      .set({ quantity: newQuantity })
      .where(eq(cartItems.id, cartItemId));

    return NextResponse.json(
      { message: "Cart item updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating cart item:", error);
    return NextResponse.json(
      { message: "Failed to update cart item", error },
      { status: 500 }
    );
  }
}

// DELETE: Remove an item from the cart
export async function DELETE(req: NextRequest) {
  try {
    const { cartItemId } = await req.json();

    if (!cartItemId) {
      return NextResponse.json(
        { message: "Missing required field: cartItemId" },
        { status: 400 }
      );
    }

    await db.delete(cartItems).where(eq(cartItems.id, cartItemId));

    return NextResponse.json(
      { message: "Cart item removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { message: "Failed to remove cart item", error },
      { status: 500 }
    );
  }
}
