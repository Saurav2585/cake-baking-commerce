"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { cartReducer, EMPTY_CART, parsePersistedCart } from "@/lib/domain/cart";
import { emitAnalytics } from "@/lib/domain/analytics";
import type { CartLine, CartState } from "@/lib/domain/types";

const CART_KEY = "pantryform:cart:v1";
const WISHLIST_KEY = "pantryform:wishlist:v1";

type CommerceContextValue = {
  cart: CartState;
  wishlist: string[];
  announcement: string;
  addLine: (line: CartLine) => void;
  setQuantity: (sku: string, quantity: number) => void;
  removeLine: (sku: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string, title: string) => void;
  completeSimulation: () => string;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);

export function CommerceProvider({
  children,
  validSkus,
}: {
  children: React.ReactNode;
  validSkus: string[];
}) {
  const [cart, dispatch] = useReducer(cartReducer, EMPTY_CART);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      dispatch({ type: "clear" });
      const restored = parsePersistedCart(
        localStorage.getItem(CART_KEY),
        new Set(validSkus),
      );
      for (const line of restored.lines) dispatch({ type: "add", line });
      try {
        const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? "[]");
        setWishlist(
          Array.isArray(saved)
            ? saved.filter(
                (value): value is string => typeof value === "string",
              )
            : [],
        );
      } catch {
        setWishlist([]);
      }
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [validSkus]);

  useEffect(() => {
    if (ready) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, ready]);

  const addLine = useCallback((line: CartLine) => {
    dispatch({ type: "add", line });
    setAnnouncement(
      `${line.productTitle}, ${line.variantLabel}, added to demo cart.`,
    );
    emitAnalytics({
      name: "add_to_cart",
      sku: line.sku,
      quantity: line.quantity,
      source: line.sources.some((source) => source.kind === "recipe")
        ? "recipe"
        : "manual",
    });
  }, []);
  const setQuantity = useCallback(
    (sku: string, quantity: number) =>
      dispatch({ type: "setQuantity", sku, quantity }),
    [],
  );
  const removeLine = useCallback((sku: string) => {
    dispatch({ type: "remove", sku });
    setAnnouncement(`${sku} removed from demo cart.`);
  }, []);
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const toggleWishlist = useCallback((productId: string, title: string) => {
    setWishlist((current) => {
      const saved = current.includes(productId);
      setAnnouncement(
        `${title} ${saved ? "removed from" : "saved to"} wishlist.`,
      );
      emitAnalytics({
        name: "wishlist_action",
        productId,
        action: saved ? "remove" : "add",
      });
      return saved
        ? current.filter((id) => id !== productId)
        : [...current, productId];
    });
  }, []);
  const completeSimulation = useCallback(() => {
    const reference = `PF-DEMO-${Date.now().toString(36).toUpperCase()}`;
    sessionStorage.setItem(
      `pantryform:confirmation:${reference}`,
      JSON.stringify({ reference, cart, createdAt: Date.now() }),
    );
    emitAnalytics({
      name: "simulated_purchase_complete",
      demoReference: reference,
      valuePaise: cart.lines.reduce(
        (sum, line) => sum + line.observedUnitPricePaise * line.quantity,
        0,
      ),
      mode: "demo",
      paymentTaken: false,
      orderCreated: false,
    });
    clearCart();
    return reference;
  }, [cart, clearCart]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      announcement,
      addLine,
      setQuantity,
      removeLine,
      clearCart,
      toggleWishlist,
      completeSimulation,
    }),
    [
      cart,
      wishlist,
      announcement,
      addLine,
      setQuantity,
      removeLine,
      clearCart,
      toggleWishlist,
      completeSimulation,
    ],
  );
  return (
    <CommerceContext.Provider value={value}>
      {children}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const value = useContext(CommerceContext);
  if (!value)
    throw new Error("useCommerce must be used inside CommerceProvider");
  return value;
}
