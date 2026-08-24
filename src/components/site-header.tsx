"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCommerce } from "./commerce-provider";

const departments = [
  "ingredients",
  "chocolate",
  "colours-flavours",
  "fillings-fondant",
  "decorating",
  "bakeware-tools",
  "packaging",
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const { cart, wishlist } = useCommerce();
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
      <header className="site-header">
        <Link className="wordmark" href="/">
          PANTRYFORM <small>Baking Ingredients &amp; Supplies</small>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          <Link href="/shop">Shop</Link>
          <Link href="/recipes">Recipes</Link>
          <Link href="/about">Our method</Link>
        </nav>
        <form className="header-search" action="/search">
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
          <Link href="/wishlist">
            Wishlist <span>{wishlist.length}</span>
          </Link>
          <Link href="/cart">
            Cart <span>{cart.lines.reduce((n, l) => n + l.quantity, 0)}</span>
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
            {departments.map((d) => (
              <Link key={d} href={`/shop/${d}`} onClick={() => setOpen(false)}>
                {d.replaceAll("-", " & ")}
              </Link>
            ))}
            <Link href="/recipes" onClick={() => setOpen(false)}>
              Recipes
            </Link>
          </aside>
        </div>
      )}
    </>
  );
}
