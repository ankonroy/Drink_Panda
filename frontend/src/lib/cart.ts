import { getCurrentUser } from './auth';

export type CartItem = {
  productId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
};

const GUEST_KEY = 'drinkpanda_cart_guest';

function getCartKey(): string {
  const user = getCurrentUser();
  return user ? `drinkpanda_cart_${user.id}` : GUEST_KEY;
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const key = getCartKey();
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as CartItem[] : [];
  } catch { return []; }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  const key = getCartKey();
  localStorage.setItem(key, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find(c => c.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function mergeCart() {
  if (typeof window === 'undefined') return;
  const user = getCurrentUser();
  if (!user) return;

  const guestCart = localStorage.getItem(GUEST_KEY);
  if (!guestCart) return;

  const userKey = `drinkpanda_cart_${user.id}`;
  const userCartRaw = localStorage.getItem(userKey);
  const userCart: CartItem[] = userCartRaw ? JSON.parse(userCartRaw) : [];

  const guestItems: CartItem[] = JSON.parse(guestCart);

  // Merge guest cart into user cart
  guestItems.forEach(guestItem => {
    const existing = userCart.find(u => u.productId === guestItem.productId);
    if (existing) {
      existing.quantity += guestItem.quantity;
    } else {
      userCart.push(guestItem);
    }
  });

  localStorage.setItem(userKey, JSON.stringify(userCart));
  localStorage.removeItem(GUEST_KEY);
}
