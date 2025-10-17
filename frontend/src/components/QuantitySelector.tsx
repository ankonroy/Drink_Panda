"use client";
import React from "react";

type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (q: number) => void;
};

export default function QuantitySelector({ value = 1, min = 1, max = 99, onChange }: Props) {
  const [qty, setQty] = React.useState<number>(value);

  React.useEffect(() => {
    setQty(value);
  }, [value]);

  const change = (next: number) => {
    const clamped = Math.max(min, Math.min(max, Math.floor(next)));
    setQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        aria-label="decrease quantity"
        type="button"
        onClick={() => change(qty - 1)}
        className="h-8 w-8 flex items-center justify-center rounded border bg-white text-lg"
      >
        −
      </button>
      <input
        aria-label="quantity"
        type="number"
        min={min}
        max={max}
        value={qty}
        onChange={(e) => change(Number(e.target.value || 0))}
        className="quantity-input w-14 text-center rounded border p-1"
        style={{ color: "rgb(var(--text))" }}
      />
      <button
        aria-label="increase quantity"
        type="button"
        onClick={() => change(qty + 1)}
        className="h-8 w-8 flex items-center justify-center rounded border bg-white text-lg"
      >
        +
      </button>
    </div>
  );
}
