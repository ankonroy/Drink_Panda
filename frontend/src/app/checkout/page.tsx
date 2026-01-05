"use client";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cart";
import { getCurrentUser, getAuthHeaders } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/auth";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const router = useRouter();
  const [items] = useState(getCart());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) router.replace("/login");

    // Check for error in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
      if (error === 'payment_failed') {
        setError('Payment failed. Please try again.');
      } else if (error === 'payment_cancelled') {
        setError('Payment was cancelled.');
      }
      // Clear the error from URL
      router.replace('/checkout');
    }
  }, [router]);

  const total = items.reduce((s, i) => s + i.unitPriceCents * i.quantity, 0);

  async function onPay(paymentMethod: 'bkash' | 'nagad') {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/checkout/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          items: items.map((i) => ({
            product_id: i.productId,
            product_name: i.name,
            unit_price_cents: i.unitPriceCents,
            quantity: i.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const data = await res.json();
      const order = data.data;

      // Initiate payment
      const payRes = await fetch(`${API_URL}/api/checkout/initiate-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ order_id: order.id, payment_method: paymentMethod }),
      });
      if (!payRes.ok) {
        const payData = await payRes.json();
        throw new Error(payData.message || "Payment initiation failed");
      }
      const payData = await payRes.json();

      // Redirect to gateway
      window.location.href = payData.redirect_url;
    } catch (unknownErr) {
      const err = unknownErr as Error;
      setError(err?.message || "Payment failed");
      setLoading(false);
    }
  }

  if (items.length === 0)
    return <div className="card p-4">Your cart is empty</div>;

  return (
    <div className="card p-4">
      <h1 className="mb-4 text-xl font-extrabold">Checkout</h1>
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
            disabled={loading}
            className="btn bg-emerald-500"
            onClick={() => onPay('bkash')}
          >
            Pay with BKash
          </button>
          <button
            disabled={loading}
            className="btn bg-orange-500"
            onClick={() => onPay('nagad')}
          >
            Pay with Nagad
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}
