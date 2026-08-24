import { describe, expect, it } from "vitest";
import { selectSingleVariant, selectSmallestSufficient } from "./recipe-solver";

const pack = (variantId: string, quantity: number, pricePaise: number) => ({
  variantId,
  sku: variantId.toUpperCase(),
  quantity,
  pricePaise,
});

describe("smallest-sufficient pack solver", () => {
  it("selects an exact match and multiple-pack solution", () => {
    expect(
      selectSmallestSufficient(600, [
        pack("a300", 300, 5000),
        pack("b500", 500, 1000),
      ]),
    ).toMatchObject({
      purchased: 600,
      leftover: 0,
      packCount: 2,
      totalPricePaise: 10000,
    });
  });

  it("uses 250 g plus 500 g for 600 g", () => {
    const result = selectSmallestSufficient(600, [
      pack("a250", 250, 4000),
      pack("b500", 500, 7000),
    ]);
    expect(result).toMatchObject({
      purchased: 750,
      leftover: 150,
      packCount: 2,
    });
    expect(
      result?.lines.map(({ variantId, count }) => [variantId, count]),
    ).toEqual([
      ["a250", 1],
      ["b500", 1],
    ]);
  });

  it("repeats the only sufficient size", () => {
    expect(
      selectSmallestSufficient(900, [pack("a250", 250, 4000)]),
    ).toMatchObject({ purchased: 1000, leftover: 100, packCount: 4 });
  });

  it("breaks equal-quantity ties by pack count, SKU count, price and stable ID", () => {
    expect(
      selectSmallestSufficient(500, [
        pack("z500", 500, 8000),
        pack("a500", 500, 7000),
        pack("b250", 250, 1000),
      ])?.lines[0].variantId,
    ).toBe("a500");
    expect(
      selectSmallestSufficient(500, [
        pack("z500", 500, 7000),
        pack("a500", 500, 7000),
      ])?.lines[0].variantId,
    ).toBe("a500");
  });

  it("supports mixed-size disabled and explicit overrides", () => {
    expect(
      selectSmallestSufficient(
        600,
        [pack("a250", 250, 4000), pack("b500", 500, 7000)],
        false,
      ),
    ).toMatchObject({ purchased: 750, packCount: 3 });
    expect(selectSingleVariant(600, pack("a250", 250, 4000))).toMatchObject({
      purchased: 750,
      leftover: 150,
      packCount: 3,
    });
  });

  it("returns null for no valid mapping and rejects invalid requirements", () => {
    expect(selectSmallestSufficient(100, [])).toBeNull();
    expect(() => selectSmallestSufficient(0, [pack("a", 100, 100)])).toThrow();
  });
});
