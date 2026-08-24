import { describe, expect, it } from "vitest";
import {
  cartReducer,
  cartSubtotalPaise,
  EMPTY_CART,
  parsePersistedCart,
} from "./cart";
import type { CartLine } from "./types";

const line = (sku = "SKU-1", quantity = 1): CartLine => ({
  sku,
  quantity,
  observedUnitPricePaise: 4999,
  productId: "product",
  variantId: `variant-${sku}`,
  productTitle: "Product",
  variantLabel: "500 g",
  brandName: "Fieldnote",
  sources: [{ kind: "manual" }],
});

describe("cart domain", () => {
  it("merges identical SKUs and keeps variants separate", () => {
    let state = cartReducer(
      { ...EMPTY_CART, lines: [] },
      { type: "add", line: line("A", 1) },
    );
    state = cartReducer(state, { type: "add", line: line("A", 2) });
    state = cartReducer(state, { type: "add", line: line("B", 1) });
    expect(state.lines.map(({ sku, quantity }) => [sku, quantity])).toEqual([
      ["A", 3],
      ["B", 1],
    ]);
    expect(cartSubtotalPaise(state)).toBe(19996);
  });

  it("updates, removes and clears without allowing invalid quantities", () => {
    const added = cartReducer(
      { ...EMPTY_CART, lines: [] },
      { type: "add", line: line() },
    );
    expect(
      cartReducer(added, { type: "setQuantity", sku: "SKU-1", quantity: 0 }),
    ).toBe(added);
    const updated = cartReducer(added, {
      type: "setQuantity",
      sku: "SKU-1",
      quantity: 3,
    });
    expect(updated.lines[0].quantity).toBe(3);
    expect(
      cartReducer(updated, { type: "remove", sku: "SKU-1" }).lines,
    ).toEqual([]);
    expect(cartReducer(updated, { type: "clear" }).lines).toEqual([]);
  });

  it("fails closed for corrupt/new persistence and removes stale SKUs", () => {
    expect(parsePersistedCart("{bad", new Set())).toEqual({
      schemaVersion: 1,
      revision: 0,
      lines: [],
    });
    expect(
      parsePersistedCart(
        JSON.stringify({ schemaVersion: 2, revision: 4, lines: [] }),
        new Set(),
      ),
    ).toEqual({ schemaVersion: 1, revision: 0, lines: [] });
    const restored = parsePersistedCart(
      JSON.stringify({
        schemaVersion: 1,
        revision: 4,
        lines: [line("VALID"), line("STALE")],
      }),
      new Set(["VALID"]),
    );
    expect(restored.lines.map(({ sku }) => sku)).toEqual(["VALID"]);
  });
});
