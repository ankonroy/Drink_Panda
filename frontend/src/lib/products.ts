export type ProductCategory = "juice" | "caffeine" | "drinks"; // drinks includes hard drinks

export type Product = {
  id: string;
  name: string;
  description: string;
  details: string; // ~300 words long description for PDP
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
    details:
      "Our Fresh Orange Juice is crafted from sun-ripened oranges, pressed at peak sweetness to capture their bright, zesty character. We never add sugar, concentrates, or artificial flavors—just whole fruit, expertly cold-pressed and quickly chilled to preserve delicate aromatic oils and vitamins. Expect a lively balance of sweetness and acidity with a clean, refreshing finish. Enjoy it straight from the bottle, over ice, or as a base for morning smoothies and brunch cocktails. Each batch is produced in small quantities to maintain quality and consistency, and we source seasonal varieties to keep the flavor profile vibrant throughout the year. Whether you’re fueling a workout, brightening your breakfast, or pairing with a light lunch, this orange juice offers a naturally energizing lift without heaviness. For best results, keep refrigerated and gently shake before serving to redistribute pulp and natural oils. Shelf life is kept intentionally short because we avoid high-heat processing. That means flavor stays true to the fruit—crisp, juicy, and unmistakably fresh.",
    priceCents: 499,
    imageUrl: "/images/orange.jpg",
    category: "juice",
    stock: 100,
  },
  {
    id: "aj-002",
    name: "Apple Juice",
    description: "Crisp apples pressed daily.",
    details:
      "This Apple Juice blends several orchard-fresh varieties to achieve the perfect harmony of crispness, sweetness, and gentle tartness. Pressed daily in small batches, it retains the nuanced notes of the apples’ skins and flesh, delivering a layered flavor that’s never flat or sugary. We avoid added sugars and heavy filtration so you’ll notice a naturally golden hue and a faint cloudiness—both signs of a minimal, respectful process. Serve well-chilled for a clean, thirst-quenching experience, or warm it lightly with a cinnamon stick for cozy evenings. It pairs beautifully with sandwiches, salads, and grain bowls. Because we use only real fruit, sediment may settle over time; simply invert or shake gently to recombine before pouring. Our commitment to transparency means the ingredient list is short, the taste is honest, and the experience is consistently satisfying. Keep refrigerated and enjoy within a few days of opening for peak freshness and aroma.",
    priceCents: 459,
    imageUrl: "/images/apple.jpg",
    category: "juice",
    stock: 80,
  },
  {
    id: "mj-003",
    name: "Mango Juice",
    description: "Ripe alphonso mangoes, thick and smooth.",
    details:
      "Our Mango Juice highlights the rich, velvety body of premium Alphonso and Kesar mangoes. Each sip is lush and tropical, with a naturally creamy texture and a bouquet that hints at honey and florals. We keep processing gentle to protect the fruit’s character, resulting in a juice that feels almost smoothie-like without added thickeners. Chill thoroughly and serve as a luxurious treat on its own, blend into popsicles, or pour over crushed ice with a squeeze of lime for contrast. It’s a beautiful companion to spicy dishes, where its sweetness can tame heat while letting spices shine. Expect subtle variation from batch to batch as harvest conditions shift—this is part of the charm of using real fruit. Refrigerate promptly, and shake well before serving to reawaken suspended fruit solids and natural oils.",
    priceCents: 599,
    imageUrl: "/images/mango.jpg",
    category: "juice",
    stock: 60,
  },
  {
    id: "pj-004",
    name: "Pineapple Juice",
    description: "Sweet and tangy, summer in a bottle.",
    details:
      "This Pineapple Juice captures the joyful brightness of ripe fruit with a lively acidity that keeps each sip refreshing. We select pineapples at peak ripeness for maximum juiciness and tropical aroma. The result is a balanced profile: vibrant, citrus-adjacent top notes with a rounded tropical sweetness underneath. Serve it frosty on hot afternoons, turn it into a spritzer with sparkling water, or mix into mocktails and cocktails that call for clarity and zing. The natural enzymes in pineapple contribute to its light, crisp finish. Because we avoid heavy pasteurization, the flavor stays bright but shelf life remains modest—please keep refrigerated and consume promptly. Gentle shaking will recombine any settled solids to restore the juice’s naturally golden body.",
    priceCents: 529,
    imageUrl: "/images/pineapple.jpg",
    category: "juice",
    stock: 50,
  },
  {
    id: "cf-005",
    name: "Cold Brew Coffee",
    description: "Smooth, low-acid, 18-hour extraction.",
    details:
      "Our Cold Brew Coffee is brewed slow and cold for up to 18 hours, coaxing out chocolatey sweetness, gentle fruit notes, and a velvety mouthfeel with significantly reduced acidity. We start with ethically sourced arabica beans, roasted to a balanced medium profile that shines when extracted at lower temperatures. The result is highly drinkable—bold yet smooth, never bitter—perfect over ice or with a splash of milk. Try it straight for clarity, or add a touch of simple syrup if you prefer a rounder profile. Each batch is filtered for clarity while preserving essential aromatics. Refrigerate after opening and enjoy within a week for best flavor. This is your all-day caffeine companion: steady energy, polished flavor, and no harsh edges.",
    priceCents: 399,
    imageUrl: "/images/coldbrew.jpg",
    category: "caffeine",
    stock: 120,
  },
  {
    id: "mt-006",
    name: "Matcha Latte",
    description: "Ceremonial grade matcha with light sweetness.",
    details:
      "Our Matcha Latte blends ceremonial-grade matcha with a silk-smooth base for a creamy texture and uplifting focus. Expect verdant, grassy top notes, a faint natural sweetness, and a lingering umami finish that feels both comforting and energizing. We lightly sweeten to keep bitterness in check without masking matcha’s character. Shake well and pour over ice, or warm it gently for cozy mornings. Matcha delivers a calm, sustained caffeine release thanks to L-theanine, making this a favorite for productivity. Keep refrigerated and consume within several days of opening. Sediment is natural—swirl to redistribute.",
    priceCents: 549,
    imageUrl: "/images/matcha.jpg",
    category: "caffeine",
    stock: 90,
  },
  {
    id: "bt-007",
    name: "Black Tea Lemonade",
    description: "Iced black tea balanced with fresh lemon.",
    details:
      "This Black Tea Lemonade pairs brisk, aromatic black tea with the lively snap of real lemon juice for a classic, endlessly drinkable refresher. The tea’s tannic structure provides backbone while citrus brightens the finish, resulting in perfect balance—neither cloying nor overly tart. Serve chilled over ice with a lemon wheel. Excellent for afternoon pick-me-ups or as a lighter alternative to soda. Keep cold and shake gently before pouring to recombine citrus oils and tea solids.",
    priceCents: 329,
    imageUrl: "/images/tea-lemonade.jpg",
    category: "caffeine",
    stock: 140,
  },
  {
    id: "sd-008",
    name: "Sparkling Citrus Soda",
    description: "Zesty lemon-lime with fine bubbles.",
    details:
      "Sparkling Citrus Soda is a bright, zippy refresher with delicate bubbles and a clean citrus profile anchored in real juice. It’s lightly sweetened to keep the focus on flavor, not syrup. Expect lemon-lime notes with a whisper of grapefruit bitterness that finishes crisp. Serve ultra-cold for maximum sparkle or use it as a mixer in spritzes and cocktails. Our carbonation level is tuned for lift without harsh bite, making it easy to enjoy can after can.",
    priceCents: 249,
    imageUrl: "/images/sparkling-citrus.jpg",
    category: "drinks",
    stock: 200,
  },
  {
    id: "gh-009",
    name: "Ginger Honey Fizz",
    description: "Spicy ginger balanced with floral honey.",
    details:
      "Ginger Honey Fizz combines real ginger’s warming spice with the rounded sweetness of honey for a sophisticated, sparkling drink. The profile starts bright and peppery, then settles into a soothing finish. It’s refreshing on its own and stellar as a mixer with citrus-forward spirits. Enjoy over ice with a lemon twist. Shake gently before opening to lift aromatics.",
    priceCents: 299,
    imageUrl: "/images/ginger-honey.jpg",
    category: "drinks",
    stock: 160,
  },
  {
    id: "lt-010",
    name: "Lime Tonic",
    description: "Dry tonic with real lime oils.",
    details:
      "Our Lime Tonic is crafted for clarity and bite: quinine’s dry edge meets fragrant lime oils for a mixer that also drinks beautifully solo. Expect a snappy, palate-cleansing finish that plays well with gin, vodka, or zero-proof spirits. Serve well-chilled and over plenty of ice.",
    priceCents: 279,
    imageUrl: "/images/lime-tonic.jpg",
    category: "drinks",
    stock: 180,
  },
  {
    id: "cm-011",
    name: "Classic Mojito (Hard)",
    description: "Cane rum, mint, and lime—bar quality.",
    details:
      "This ready-to-drink Mojito balances cool mint, fresh lime, and lightly sweetened cane rum for a bar-quality cocktail with no fuss. Bubbly and bright, it’s perfect for parties, picnics, or nights in. Serve over crushed ice with a mint sprig. Please enjoy responsibly.",
    priceCents: 699,
    imageUrl: "/images/mojito.jpg",
    category: "drinks",
    stock: 70,
  },
  {
    id: "sn-012",
    name: "Spiced Negroni (Hard)",
    description: "Bittersweet, citrus, and warm spice.",
    details:
      "A modern riff on the classic Negroni featuring a bittersweet backbone, citrus peel brightness, and a subtle warm spice finish. Stir with ice and strain into a chilled glass with an orange twist. Complex, elegant, and ready when you are. Please enjoy responsibly.",
    priceCents: 899,
    imageUrl: "/images/negroni.jpg",
    category: "drinks",
    stock: 55,
  },
];

export function formatPrice(priceCents: number): string {
  return `$${(priceCents / 100).toFixed(2)}`;
}

import { getAuthHeaders } from "@/lib/auth";

export async function getAllProducts(): Promise<Product[]> {
  const headers = getAuthHeaders();
  const res = await fetch("http://localhost:8000/api/products", { headers });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  //   console.log(data.data);
  return data.data;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const headers = getAuthHeaders();
  const res = await fetch(`http://localhost:8000/api/products/${id}`, {
    headers,
  });
  if (!res.ok) return undefined;
  const data = await res.json();
  //   console.log(data);
  return data.data;
}

export async function createProduct(
  productData: Omit<Product, "id">
): Promise<Product> {
  const headers = { ...getAuthHeaders(), "Content-Type": "application/json" };
  const res = await fetch("http://localhost:8000/api/products", {
    method: "POST",
    headers,
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Failed to create product: ${res.status} ${res.statusText} - ${errorData.message || JSON.stringify(errorData)}`);
  }
  const data = await res.json();
  return data.data;
}

export async function updateProduct(
  id: string,
  productData: Partial<Omit<Product, "id">>
): Promise<Product> {
  const headers = { ...getAuthHeaders(), "Content-Type": "application/json" };
  const res = await fetch(`http://localhost:8000/api/products/${id}`, {
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
  const res = await fetch(`http://localhost:8000/api/products/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!res.ok) throw new Error("Failed to delete product");
}
