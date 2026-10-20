"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  House,
  ChartNoAxesCombined,
  BriefcaseBusiness,
} from "lucide-react";
import { nav } from "@/data/navigation";
import { TradingTopNav } from "./trading-top-nav";
const visibleNav = nav;
function ActiveLink({
  href,
  label,
  icon: Icon,
  onClick,
  showLabel = true,
}: {
  href: string;
  label: string;
  icon: typeof House;
  onClick?: () => void;
  showLabel?: boolean;
}) {
  const p = usePathname(),
    active = href === "/" ? p === href : p.startsWith(href);
  return (
    <Link
      onClick={onClick}
      href={href}
      title={label}
      className={`flex min-h-11 items-center gap-4 rounded-xl px-3 text-[14px] transition ${active ? "bg-[var(--text)] text-[var(--surface)]" : "muted hover:bg-[var(--soft)] hover:text-[var(--text)]"}`}
    >
      <Icon className="shrink-0" size={18} />
      <span
        className={`whitespace-nowrap transition ${showLabel ? "opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100" : "opacity-0"}`}
      >
        {label}
      </span>
    </Link>
  );
}
export function AppShell({ children }: { children: React.ReactNode }) {
  const [more, setMore] = useState(false);
  const [menuClosed, setMenuClosed] = useState(false);
  useEffect(() => {
    if ("vibrate" in navigator) navigator.vibrate(30);
  }, []);
  const closeMenu = () => setMenuClosed(true);
  return (
    <>
      <div className="splash pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="splash-title text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[.9] tracking-[-.075em] text-black">
          Выгодно
          <br />и с умом
        </div>
      </div>
      <aside
        onMouseLeave={() => setMenuClosed(false)}
        className={`group/sidebar fixed inset-y-0 left-0 z-50 hidden w-[72px] overflow-hidden border-r border-[var(--line)] bg-[var(--surface)] p-3 transition-[width,box-shadow] duration-300 md:flex md:flex-col ${menuClosed ? "" : "hover:w-[250px] hover:shadow-2xl focus-within:w-[250px]"}`}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="mb-8 flex h-12 items-center gap-4 px-3"
        >
          <span className="shrink-0 text-xl font-bold">$</span>
          <span
            className={`whitespace-nowrap text-lg font-semibold transition ${menuClosed ? "opacity-0" : "opacity-0 group-hover/sidebar:opacity-100"}`}
          >
            Выгодно и с умом
          </span>
        </Link>
        <nav className="space-y-1">
          {visibleNav.slice(0, 7).map((x) => (
            <ActiveLink
              key={x.href}
              {...x}
              onClick={closeMenu}
              showLabel={!menuClosed}
            />
          ))}
        </nav>
        <nav className="mt-auto space-y-1">
          {visibleNav.slice(7).map((x) => (
            <ActiveLink
              key={x.href}
              {...x}
              onClick={closeMenu}
              showLabel={!menuClosed}
            />
          ))}
        </nav>
      </aside>
      <main className="mx-auto min-h-screen max-w-[1480px] px-5 pb-28 sm:px-8 md:ml-[72px] md:px-12 md:pb-10 lg:px-16">
        <TradingTopNav />
        {children}
        <footer className="muted mt-20 border-t border-[var(--line)] py-6 text-xs">
          Прототип платформы. Торговые функции и реальные финансовые операции
          пока недоступны.
        </footer>
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[var(--line)] bg-[var(--surface)] px-1 pb-[env(safe-area-inset-bottom)] md:hidden">
        {[
          { label: "Главная", href: "/", icon: House },
          { label: "Торговля", href: "/trading", icon: ChartNoAxesCombined },
          { label: "Портфель", href: "/portfolio", icon: BriefcaseBusiness },
        ].map((x) => (
          <Link
            key={x.href}
            href={x.href}
            className="muted flex h-16 flex-col items-center justify-center gap-1 text-[10px]"
          >
            <x.icon size={20} />
            {x.label}
          </Link>
        ))}
        <button
          onClick={() => setMore(true)}
          className="muted flex h-16 flex-col items-center justify-center gap-1 text-[10px]"
        >
          <Menu size={20} />
          Ещё
        </button>
      </nav>
      {more && (
        <div
          className="fixed inset-0 z-50 bg-black/25 md:hidden"
          onClick={() => setMore(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-[var(--surface)] p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <b>Все разделы</b>
              <button
                onClick={() => setMore(false)}
                className="rounded-full bg-[var(--soft)] p-2"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {visibleNav
                .slice(2)
                .filter((x) => x.href !== "/portfolio")
                .map((x) => (
                  <ActiveLink
                    key={x.href}
                    {...x}
                    onClick={() => setMore(false)}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
