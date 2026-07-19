// ─── Charities Service Client ───────────────────────────────
// Giving layer: curated collections + live charity search.
// Donations happen on the provider's site (Every.org / GlobalGiving).
// ─────────────────────────────────────────────────────────────

import { createApiClient } from "@rodrigo-barraza/utilities-library";

import { ANIMALS_SERVICE_URL } from "@/config";

export interface Charity {
  provider: "everyorg" | "globalgiving" | "curated";
  id: string;
  name: string;
  description: string;
  country: string;
  imageUrl: string | null;
  websiteUrl: string | null;
  donateUrl: string;
}

export interface CharityCollection {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  charities: Charity[];
}

export interface CharitySearchResponse {
  providers: { everyorg: boolean; globalgiving: boolean };
  count: number;
  items: Charity[];
}

const api = createApiClient(ANIMALS_SERVICE_URL ?? "");

export async function fetchCharityCollections(): Promise<{ count: number; items: CharityCollection[] }> {
  return api.get<{ count: number; items: CharityCollection[] }>("/charities/collections");
}

export async function searchCharities(query: string, limit = 20): Promise<CharitySearchResponse> {
  return api.get<CharitySearchResponse>(
    `/charities/search?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
}

export async function fetchDonationStats(): Promise<{ count: number; totalAmount: number; currency: string }> {
  return api.get<{ count: number; totalAmount: number; currency: string }>("/donations/stats");
}
