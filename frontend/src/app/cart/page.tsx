"use client";
import { useEffect, useState } from "react";
import { getCart, CartItem, clearCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setItems(getCart());
  }, []);

  if (items.length === 0)
    return <div className="card p-4">Your cart is empty</div>;

  const total = items.reduce((s, i) => s + i.unitPriceCents * i.quantity, 0);

  return (
    <div className="card p-4">
      <h1 className="mb-4 text-xl font-extrabold">Cart</h1>
      <div className="grid gap-2">
        {items.map((it) => (
          <div key={it.productId} className="flex justify-between">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm opacity-80">Qty: {it.quantity}</div>
            </div>
            <div>{formatPrice(it.unitPriceCents * it.quantity)}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="font-extrabold">Total: {formatPrice(total)}</div>
        <div className="flex gap-2">
          <button
            className="btn"
            onClick={() => {
              clearCart();
              setItems([]);
            }}
          >
            Clear
          </button>
          <button
            className="btn bg-emerald-500"
            onClick={() => router.push("/checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
