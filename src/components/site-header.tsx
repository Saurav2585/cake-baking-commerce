"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { departmentDisplay } from "@/data/real-products";
import { useCommerce } from "./commerce-provider";

const drawerDepartments = Object.entries(departmentDisplay) as Array<
  [
    keyof typeof departmentDisplay,
    (typeof departmentDisplay)[keyof typeof departmentDisplay],
  ]
>;

const categoryNav: Array<{
  label: string;
  href: string;
  mega?: Array<{ label: string; href: string }>;
}> = [
  { label: "Shop All", href: "/shop" },
  { label: "Chocolates & Cocoa", href: "/shop/chocolate" },
  { label: "Baking Essentials", href: "/shop/ingredients" },
  { label: "Colours & Flavours", href: "/shop/colours-flavours" },
  {
    label: "Fondant & Decoration",
    href: "/shop/fillings-fondant",
    mega: [
      { label: "Fillings & Fondant", href: "/shop/fillings-fondant" },
      { label: "Decorating", href: "/shop/decorating" },
    ],
  },
  { label: "Tools & Bakeware", href: "/shop/bakeware-tools" },
  { label: "Packaging", href: "/shop/packaging" },
  { label: "Recipes", href: "/recipes" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const { cart, wishlist } = useCommerce();
  const cartCount = cart.lines.reduce((n, l) => n + l.quantity, 0);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    const trigger = triggerRef.current;
    return () => {
      document.removeEventListener("keydown", handler);
      trigger?.focus();
    };
  }, [open]);
  return (
    <>
      <div className="demo-strip">
        Portfolio demo · fictional products and INR prices · no real orders or
        payments
      </div>
      <div className="offer-bar">
        <span>7 baking-supply departments</span>
        <span>Recipe-led planning</span>
        <span>Simulated secure checkout</span>
      </div>
      <header className="site-header">
        <div className="header-primary">
          <Link
            className="brand-lockup"
            href="/"
            aria-label="Pantryform — home"
          >
            <Image
              className="brand-logo-full"
              src="/brand/Pantryform-logo-final.png"
              alt=""
              width={2079}
              height={756}
              priority
            />
            <Image
              className="brand-logo-mark"
              src="/brand/pantryform-mark.png"
              alt=""
              width={395}
              height={453}
              priority
            />
          </Link>
          <form
            className="header-search primary-search"
            action="/search"
            role="search"
          >
            <label className="sr-only" htmlFor="global-search">
              Search products and recipes
            </label>
            <input
              id="global-search"
              name="q"
              type="search"
              placeholder="Search cocoa, colour, pan…"
            />
            <button>Search</button>
          </form>
          <div className="header-actions">
            <span className="demo-account" aria-hidden="true">
              Demo account
            </span>
            <Link href="/wishlist" className="icon-action">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  fill="currentColor"
                  d="M12 20.6 3.6 12.2C1.5 10 1.5 6.7 3.6 4.6c2-2 5.3-2 7.3.1L12 5.8l1.1-1.1c2-2.1 5.3-2.1 7.3-.1 2.1 2.1 2.1 5.4 0 7.6L12 20.6Z"
                />
              </svg>
              <span className="label-text">Wishlist</span>
              <span className="count-badge">{wishlist.length}</span>
            </Link>
            <Link href="/cart" className="icon-action">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  fill="currentColor"
                  d="M6.2 6h15l-1.9 9.6a2 2 0 0 1-2 1.6H8.6a2 2 0 0 1-2-1.7L5 3.6H2v-2h4.4l.5 3ZM9 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                />
              </svg>
              <span className="label-text">Cart</span>
              <span className="count-badge">{cartCount}</span>
            </Link>
            <button
              ref={triggerRef}
              className="menu-button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
            >
              Menu
            </button>
          </div>
        </div>
        <nav className="category-nav" aria-label="Categories">
          {categoryNav.map((item) => (
            <div
              key={item.label}
              className={item.mega ? "nav-item has-mega" : "nav-item"}
            >
              <Link href={item.href}>{item.label}</Link>
              {item.mega && (
                <div className="mega-panel" role="menu">
                  {item.mega.map((sub) => (
                    <Link key={sub.href} href={sub.href} role="menuitem">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>
      {open && (
        <div
          className="drawer-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <aside
            ref={drawerRef}
            className="nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
          >
            <button
              ref={closeRef}
              className="drawer-close"
              onClick={() => setOpen(false)}
            >
              Close menu
            </button>
            <h2 id="menu-title">The measured pantry</h2>
            <Link href="/shop" onClick={() => setOpen(false)}>
              Shop all
            </Link>
            {drawerDepartments.map(([slug, info]) => (
              <Link
                key={slug}
                href={`/shop/${slug}`}
                onClick={() => setOpen(false)}
              >
                {info.title}
              </Link>
            ))}
            <Link href="/recipes" onClick={() => setOpen(false)}>
              Recipes
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              Our method
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
