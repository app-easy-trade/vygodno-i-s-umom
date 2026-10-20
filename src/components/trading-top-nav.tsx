"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tradingCategories } from "@/data/trading";

export function TradingTopNav() {
  const pathname = usePathname();
  const itemClass = (active: boolean) =>
    `shrink-0 rounded-full px-5 py-3 text-sm font-medium transition ${
      active
        ? "bg-[var(--text)] text-[var(--surface)] shadow-md"
        : "bg-[var(--soft)] text-[var(--muted)] hover:bg-white hover:text-[var(--text)] hover:shadow-sm"
    }`;

  return (
    <div className="sticky top-3 z-30 mb-10 rounded-[24px] border border-[var(--line)] bg-white p-2.5 shadow-[0_8px_28px_rgba(32,55,82,.09),0_2px_8px_rgba(32,55,82,.05)]">
      <nav
        className="flex max-w-full gap-2 overflow-x-auto"
        aria-label="Торговые направления"
      >
        <Link href="/trading" className={itemClass(pathname === "/trading")}>
          Обзор
        </Link>
        {tradingCategories.map((item) => (
          <Link
            key={item.slug}
            href={`/trading/${item.slug}`}
            className={itemClass(pathname === `/trading/${item.slug}`)}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
