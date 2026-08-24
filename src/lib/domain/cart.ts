import type { CartAction, CartLine, CartState } from "./types";

export const EMPTY_CART: CartState = Object.freeze({
  schemaVersion: 1,
  revision: 0,
  lines: [],
});
const MAX_LINES = 100;
const MAX_QUANTITY = 99;

function validLine(line: unknown): line is CartLine {
  if (!line || typeof line !== "object") return false;
  const item = line as CartLine;
  return (
    typeof item.sku === "string" &&
    item.sku.length > 0 &&
    typeof item.variantId === "string" &&
    typeof item.productId === "string" &&
    Number.isSafeInteger(item.quantity) &&
    item.quantity > 0 &&
    item.quantity <= MAX_QUANTITY &&
    Number.isSafeInteger(item.observedUnitPricePaise) &&
    item.observedUnitPricePaise >= 0 &&
    Array.isArray(item.sources)
  );
}

export function parsePersistedCart(
  value: string | null,
  validSkus: ReadonlySet<string>,
): CartState {
  if (!value) return { ...EMPTY_CART, lines: [] };
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object")
      return { ...EMPTY_CART, lines: [] };
    const envelope = parsed as {
      schemaVersion?: unknown;
      revision?: unknown;
      lines?: unknown;
    };
    if (
      envelope.schemaVersion !== 1 ||
      !Number.isSafeInteger(envelope.revision) ||
      !Array.isArray(envelope.lines) ||
      envelope.lines.length > MAX_LINES
    )
      return { ...EMPTY_CART, lines: [] };
    const lines = envelope.lines.filter(
      (line): line is CartLine => validLine(line) && validSkus.has(line.sku),
    );
    return { schemaVersion: 1, revision: envelope.revision as number, lines };
  } catch {
    return { ...EMPTY_CART, lines: [] };
  }
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === "clear")
    return { schemaVersion: 1, revision: state.revision + 1, lines: [] };
  if (action.type === "remove")
    return {
      ...state,
      revision: state.revision + 1,
      lines: state.lines.filter((line) => line.sku !== action.sku),
    };
  if (action.type === "setQuantity") {
    if (
      !Number.isSafeInteger(action.quantity) ||
      action.quantity < 1 ||
      action.quantity > MAX_QUANTITY
    )
      return state;
    return {
      ...state,
      revision: state.revision + 1,
      lines: state.lines.map((line) =>
        line.sku === action.sku ? { ...line, quantity: action.quantity } : line,
      ),
    };
  }
  if (!validLine(action.line)) return state;
  const existing = state.lines.find((line) => line.sku === action.line.sku);
  if (existing && existing.quantity + action.line.quantity > MAX_QUANTITY)
    return state;
  const lines = existing
    ? state.lines.map((line) =>
        line.sku === action.line.sku
          ? {
              ...line,
              quantity: line.quantity + action.line.quantity,
              sources: [...line.sources, ...action.line.sources],
            }
          : line,
      )
    : [...state.lines, action.line];
  return { ...state, revision: state.revision + 1, lines };
}

export function cartSubtotalPaise(cart: CartState): number {
  return cart.lines.reduce(
    (sum, line) => sum + line.observedUnitPricePaise * line.quantity,
    0,
  );
}
