export type AnalyticsEvent =
  | {
      name: "add_to_cart";
      sku: string;
      quantity: number;
      source: "manual" | "recipe";
    }
  | { name: "view_cart"; lineCount: number; valuePaise: number }
  | {
      name: "begin_checkout";
      cartRevision: number;
      valuePaise: number;
      mode: "demo";
    }
  | {
      name: "simulated_purchase_complete";
      demoReference: string;
      valuePaise: number;
      mode: "demo";
      paymentTaken: false;
      orderCreated: false;
    }
  | { name: "modify_recipe_mapping"; recipeId: string; action: string }
  | {
      name: "add_recipe_items_to_cart";
      recipeId: string;
      selectedCount: number;
      skippedCount: number;
    }
  | { name: "product_view"; productId: string; sku: string }
  | { name: "search"; query: string; resultCount: number }
  | { name: "filter_use"; filter: string; value: string }
  | { name: "variant_selection"; productId: string; sku: string }
  | { name: "wishlist_action"; productId: string; action: "add" | "remove" }
  | { name: "recipe_to_cart_review"; recipeId: string }
  | {
      name: "recipe_to_cart_completion";
      recipeId: string;
      selectedCount: number;
    };

export interface AnalyticsPort {
  track(event: AnalyticsEvent): void | Promise<void>;
}
export class NoopAnalytics implements AnalyticsPort {
  track(event: AnalyticsEvent): void {
    void event;
  }
}
export class DebugAnalytics implements AnalyticsPort {
  readonly events: AnalyticsEvent[] = [];
  track(event: AnalyticsEvent): void {
    this.events.push(structuredClone(event));
  }
}

const localAnalytics = new NoopAnalytics();
export function emitAnalytics(event: AnalyticsEvent): void {
  void localAnalytics.track(event);
}
