// ─── useFavorites storage tests ─────────────────────────────

import { describe, it, expect, beforeEach } from "vitest";
import { readFavorites } from "../src/hooks/useFavorites";
import { FAVORITES_STORAGE_KEY } from "../src/constants";

describe("readFavorites", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns an empty list with no stored value", () => {
    expect(readFavorites()).toEqual([]);
  });

  it("reads stored ids", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(["a", "b"]));
    expect(readFavorites()).toEqual(["a", "b"]);
  });

  it("survives corrupted storage", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, "not-json{");
    expect(readFavorites()).toEqual([]);
  });

  it("filters non-string entries", () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(["a", 5, null, "b"]));
    expect(readFavorites()).toEqual(["a", "b"]);
  });
});
