"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllProducts,
  formatPrice,
  type ProductCategory,
} from "@/lib/products";

export default function HomeClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Awaited<ReturnType<typeof getAllProducts>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Responsive: estimate columns based on screen size (default 4)
  // For simplicity, set columns = 4. You can make this dynamic if needed.
  const columns = 4;
  const rowsPerPage = 2;
  const productsPerPage = columns * rowsPerPage;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byCategory = products.filter((p) =>
      category === "all" ? true : p.category === category
    );
    if (!q) return byCategory;
    return byCategory.filter((p) =>
      [p.name, p.description, p.category].some((v) =>
        String(v).toLowerCase().includes(q)
      )
    );
  }, [products, query, category]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filtered.length / productsPerPage));
  const paginatedProducts = filtered.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [query, category]);

  return (
    <div>
      {/* Hero + Search */}
      <section className="mb-6">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-extrabold">Cool Juices. Fresh Vibes.</h1>
          <p className="text-gray-400 mt-2">Squeezed daily. Delivered fast.</p>
        </div>
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex overflow-hidden rounded-xl border border-gray-500/30">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              placeholder="Search products..."
              className="flex-1 bg-transparent px-4 py-3 outline-none text-[rgb(var(--text))]"
            />
            <button
              type="button"
              className="bg-emerald-500 px-5 text-sm font-semibold text-gray-900 hover:brightness-110"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Category Bar */}
      <section className="mb-6 rounded-xl border border-gray-500/20 bg-[rgb(var(--card))] px-4 py-6">
        <div className="flex items-center justify-center gap-3">
          {(["all", "juice", "caffeine", "drinks"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                category === c
                  ? "bg-emerald-500 text-gray-900"
                  : "bg-transparent border border-gray-500/40 text-[rgb(var(--text))]"
              }`}
              type="button"
            >
              {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <div className="text-center text-gray-400 py-8">
          Loading products...
        </div>
      ) : (
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]">
          {paginatedProducts.map((p) => (
            <div key={p.id} className="card overflow-hidden flex flex-col">
              <div
                className="relative w-full bg-black/60"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col h-full gap-1 px-4 py-3">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-gray-400">{p.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold">{formatPrice(p.priceCents)}</span>
                  <Link
                    className="inline-flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-100 px-3 py-1.5"
                    href={`/product/${p.id}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No juices match your search.
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-1 rounded bg-gray-700 text-gray-100 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-emerald-500 text-gray-900"
                  : "bg-gray-700 text-gray-100"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-700 text-gray-100 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
