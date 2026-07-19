"use client";

// ─── useFavorites ───────────────────────────────────────────
// localStorage-backed favorite listings (no account required).
// Stores listing ids; syncs across tabs via the storage event.
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect, useState } from "react";
import { FAVORITES_STORAGE_KEY } from "@/constants";

export function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage full/blocked — favorites just won't persist.
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(readFavorites());
    setMounted(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_STORAGE_KEY) setFavorites(readFavorites());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((f) => f !== id) : [...current, id];
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite, mounted };
}
