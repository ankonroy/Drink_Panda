export type ProductCategory = "juice" | "caffeine" | "drinks";

export type Product = {
  id: string;
  name: string;
  description: string;
  details: string;
  priceCents: number;
  imageUrl: string;
  category: ProductCategory;
  stock: number;
};

export const mockProducts: Product[] = [
  {
    id: "oj-001",
    name: "Fresh Orange Juice",
    description: "Cold-pressed oranges, no sugar added.",
    details: "Our Fresh Orange Juice is crafted from sun-ripened oranges, pressed at peak sweetness.",
    priceCents: 499,
    imageUrl: "/images/orange.jpg",
    category: "juice",
    stock: 100,
  },
  {
    id: "aj-002",
    name: "Apple Juice",
    description: "Crisp apples pressed daily.",
    details: "This Apple Juice blends several orchard-fresh varieties for perfect harmony.",
    priceCents: 459,
    imageUrl: "/images/apple.jpg",
    category: "juice",
    stock: 80,
  },
  {
    id: "mj-003",
    name: "Mango Juice",
    description: "Ripe alphonso mangoes, thick and smooth.",
    details: "Our Mango Juice highlights the rich, velvety body of premium mangoes.",
    priceCents: 599,
    imageUrl: "/images/mango.jpg",
    category: "juice",
    stock: 60,
  },
  {
    id: "cf-005",
    name: "Cold Brew Coffee",
    description: "Smooth, low-acid, 18-hour extraction.",
    details: "Our Cold Brew Coffee is brewed slow and cold for up to 18 hours.",
    priceCents: 399,
    imageUrl: "/images/coldbrew.jpg",
    category: "caffeine",
    stock: 120,
  },
];

export function formatPrice(priceCents: number): string {
  return `$${(priceCents / 100).toFixed(2)}`;
}

import { getAuthHeaders, API_URL } from "@/lib/auth";

export async function getAllProducts(): Promise<Product[]> {
  const headers = getAuthHeaders();
  const res = await fetch(`${API_URL}/api/products`, { headers });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const headers = getAuthHeaders();
  const res = await fetch(`${API_URL}/api/products/${id}`, { headers });
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.data;
}

export async function createProduct(productData: Omit<Product, "id">): Promise<Product> {
  const headers = { ...getAuthHeaders(), "Content-Type": "application/json" };
  const res = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers,
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to create product");
  const data = await res.json();
  return data.data;
}

export async function updateProduct(id: string, productData: Partial<Omit<Product, "id">>): Promise<Product> {
  const headers = { ...getAuthHeaders(), "Content-Type": "application/json" };
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Failed to update product");
  const data = await res.json();
  return data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  const headers = getAuthHeaders();
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete product");
}

