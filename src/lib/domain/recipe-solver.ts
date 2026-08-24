import type { PackOption, PackSelection } from "./types";

function compareSelection(a: PackSelection, b: PackSelection): number {
  return (
    a.purchased - b.purchased ||
    a.leftover - b.leftover ||
    a.packCount - b.packCount ||
    a.lines.length - b.lines.length ||
    a.totalPricePaise - b.totalPricePaise ||
    a.lines
      .map((line) => line.variantId)
      .sort()
      .join("|")
      .localeCompare(
        b.lines
          .map((line) => line.variantId)
          .sort()
          .join("|"),
      )
  );
}

/** Exhaustive Phase 2B smallest-sufficient solver. Input quantities must share one canonical unit. */
export function selectSmallestSufficient(
  required: number,
  options: PackOption[],
  allowMixed = true,
): PackSelection | null {
  if (!Number.isFinite(required) || required <= 0)
    throw new Error("Required quantity must be positive");
  const eligible = options.filter(
    (option) =>
      option.quantity > 0 &&
      Number.isFinite(option.quantity) &&
      Number.isSafeInteger(option.pricePaise) &&
      option.pricePaise >= 0,
  );
  if (!eligible.length) return null;
  const sorted = [...eligible].sort((a, b) =>
    a.variantId.localeCompare(b.variantId),
  );
  const smallest = Math.min(...sorted.map((option) => option.quantity));
  const upper = Math.ceil(required / smallest) * smallest;
  let best: PackSelection | null = null;

  const visit = (index: number, counts: number[]) => {
    if (index === sorted.length) {
      const lines = sorted.flatMap((option, position) =>
        counts[position] ? [{ ...option, count: counts[position] }] : [],
      );
      if (!lines.length || (!allowMixed && lines.length > 1)) return;
      const purchased = lines.reduce(
        (sum, line) => sum + line.quantity * line.count,
        0,
      );
      if (purchased < required || purchased > upper) return;
      const candidate: PackSelection = {
        required,
        purchased,
        leftover: purchased - required,
        packCount: lines.reduce((sum, line) => sum + line.count, 0),
        totalPricePaise: lines.reduce(
          (sum, line) => sum + line.pricePaise * line.count,
          0,
        ),
        lines,
      };
      if (!best || compareSelection(candidate, best) < 0) best = candidate;
      return;
    }
    const max = Math.floor(upper / sorted[index].quantity);
    for (let count = 0; count <= max; count += 1) {
      counts[index] = count;
      visit(index + 1, counts);
    }
  };
  visit(0, new Array(sorted.length).fill(0));
  return best;
}

export function selectSingleVariant(
  required: number,
  option: PackOption,
): PackSelection {
  const count = Math.ceil(required / option.quantity);
  const purchased = option.quantity * count;
  return {
    required,
    purchased,
    leftover: purchased - required,
    packCount: count,
    totalPricePaise: option.pricePaise * count,
    lines: [{ ...option, count }],
  };
}
