"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { clearCart } from "@/lib/cart";

function OrderSuccessContent() {
  const params = useSearchParams();
  const txn = params?.get('txn');

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="card p-4">
      <h1 className="mb-4 text-xl font-extrabold text-green-600">Order Successful!</h1>
      <p>Thank you for your purchase.</p>
      {txn && <p className="text-sm opacity-80">Transaction ID: {txn}</p>}
      <button className="btn mt-4" onClick={() => window.location.href = "/"}>
        Continue Shopping
      </button>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="card p-4">
        <h1 className="mb-4 text-xl font-extrabold">Processing...</h1>
        <p>Please wait while we confirm your order.</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}