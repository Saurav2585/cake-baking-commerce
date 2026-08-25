"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { departmentDisplay } from "@/data/real-products";

const footerDepartments = Object.entries(departmentDisplay);

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="footer-logo-plate">
          <Image
            src="/brand/Pantryform-logo-final.png"
            alt="Pantryform"
            width={2079}
            height={756}
          />
        </span>
        <p>
          A fictional portfolio shop for measured baking ingredients and
          supplies.
        </p>
        <form
          className="newsletter-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email for demo newsletter
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <button type="submit">Notify me</button>
        </form>
        <small aria-live="polite">
          {subscribed
            ? "Demo only — no email was sent or stored."
            : "Demo signup — nothing is transmitted or saved."}
        </small>
      </div>
      <nav aria-label="Shop categories" className="footer-nav">
        <strong>Shop</strong>
        <Link href="/shop">Shop all</Link>
        {footerDepartments.map(([slug, info]) => (
          <Link key={slug} href={`/shop/${slug}`}>
            {info.title}
          </Link>
        ))}
        <Link href="/recipes">Recipes</Link>
      </nav>
      <nav aria-label="Information" className="footer-nav">
        <strong>Information</strong>
        <Link href="/about">Our method</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/shipping-returns">Shipping &amp; returns</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <small className="footer-disclosure">
        Prototype direction only—formal legal clearance pending. No real
        payment, inventory, fulfilment or order. Selected product and brand
        imagery shown on this site is used for portfolio/demonstration purposes
        only and remains the property of its respective owner. Pantryform is a
        fictional demo project and is not affiliated with, sponsored by, or
        endorsed by any brand shown.
      </small>
    </footer>
  );
}
