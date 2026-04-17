// app/api/products/update-stock/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
});

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();

    console.log("📦 Stock update request:", { productId, quantity });

    // Validation
    if (!productId || !quantity) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { success: false, message: "Missing productId or quantity" },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      console.error("❌ Invalid quantity:", quantity);
      return NextResponse.json(
        { success: false, message: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    // First, get the current product to check stock
    console.log("🔍 Fetching current product...");
    const product = await client.fetch(
      `*[_type == "product" && _id == $productId][0]{ _id, stockQuantity }`,
      { productId }
    );

    if (!product) {
      console.error("❌ Product not found:", productId);
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    console.log("📊 Current stock:", product.stockQuantity);

    // Calculate new stock quantity
    const newStockQuantity = Math.max(0, product.stockQuantity - quantity);
    console.log("📉 New stock will be:", newStockQuantity);

    // Update product stock in Sanity
    console.log("💾 Updating in Sanity...");
    const updatedProduct = await client
      .patch(productId)
      .set({ stockQuantity: newStockQuantity })
      .commit();

    console.log("✅ Stock updated successfully");

    return NextResponse.json({
      success: true,
      productId: updatedProduct._id,
      previousStock: product.stockQuantity,
      newStock: newStockQuantity,
      quantityPurchased: quantity,
    });
  } catch (error) {
    console.error("❌ Error updating product stock:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product stock",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
