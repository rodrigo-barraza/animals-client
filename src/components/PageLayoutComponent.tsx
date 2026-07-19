"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import {
  PageLayoutComponent as LibraryPageLayout,
  useTheme,
} from "@rodrigo-barraza/components-library";
import { NAV_ITEMS } from "@/constants";

/**
 * PageLayoutComponent — Thin wrapper around the library PageLayoutComponent,
 * pre-configured for Animals with brand identity, nav items, and theming.
 */
export default function PageLayoutComponent({
  children,
  mainStyle,
  mainClassName,
}: {
  children: React.ReactNode;
  mainStyle?: React.CSSProperties;
  mainClassName?: string;
}) {
  const pathname = usePathname();
  const { theme, themes, setTheme, mounted } = useTheme();
  const currentTheme = !mounted ? "dark" : theme;

  // Highlight the section root for nested routes (/adopt/123 → /adopt).
  const activeItem =
    NAV_ITEMS.filter((item) => item.href !== "/")
      .map((item) => item.href)
      .find((href) => pathname.startsWith(href)) || pathname;

  return (
    <LibraryPageLayout
      brandIcon={<PawPrint size={22} />}
      brandLabel="Animals"
      items={NAV_ITEMS}
      activeItem={activeItem}
      theme={currentTheme}
      themes={themes}
      setTheme={setTheme}
      LinkComponent={Link}
      storageKey="animals-nav-collapsed"
      mainStyle={mainStyle}
      mainClassName={mainClassName}
    >
      {children}
    </LibraryPageLayout>
  );
}
