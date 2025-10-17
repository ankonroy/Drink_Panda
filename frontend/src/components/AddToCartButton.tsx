"use client";
import { addToCart } from "@/lib/cart";
import { useRouter } from "next/navigation";
import React from "react";
import QuantitySelector from "./QuantitySelector";

type ProductShape = {
  id: number | string;
  name: string;
  priceCents: number;
};

export default function AddToCartButton({ product }:{ product: ProductShape }){
  const router = useRouter();
  const [quantity, setQuantity] = React.useState<number>(1);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <QuantitySelector value={quantity} onChange={(q) => setQuantity(q)} />
        <div className="text-sm" style={{ color: "rgb(var(--text))" }}>
          Each: ${(product.priceCents / 100).toFixed(2)}
        </div>
      </div>
      <button
        onClick={() => {
          addToCart({
            productId: String(product.id),
            name: product.name,
            unitPriceCents: product.priceCents,
            quantity: quantity,
          });
          router.push("/cart");
        }}
        className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-gray-900 hover:brightness-110 w-full"
      >
        Add to cart
      </button>
    </div>
  );
}
