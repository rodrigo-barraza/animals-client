// ─── Listings Service Client ────────────────────────────────
// Adoption listings, organizations, and sync status from
// animals-service.
// ─────────────────────────────────────────────────────────────

import { createApiClient } from "@rodrigo-barraza/utilities-library";

import { ANIMALS_SERVICE_URL } from "@/config";

export interface ListingAttributes {
  spayedNeutered: boolean | null;
  houseTrained: boolean | null;
  specialNeeds: boolean | null;
  shotsCurrent: boolean | null;
  goodWithChildren: boolean | null;
  goodWithDogs: boolean | null;
  goodWithCats: boolean | null;
}

export interface Listing {
  _id: string;
  source: string;
  sourceId: string;
  name: string;
  species: string;
  breed: string;
  breedSecondary: string;
  mixedBreed: boolean;
  age: string;
  sex: string;
  size: string;
  status: string;
  description: string;
  photos: string[];
  attributes: ListingAttributes;
  organizationSourceId: string;
  location: {
    city: string;
    state: string;
    postcode: string;
    country: string;
    coordinates: { type: "Point"; coordinates: [number, number] } | null;
  };
  url: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListingResponse {
  count: number;
  total: number;
  items: Listing[];
}

export interface ListingStats {
  adoptable: number;
  bySpecies: Record<string, number>;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
}

export interface Organization {
  _id: string;
  source: string;
  sourceId: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  website: string | null;
  url: string | null;
  description: string;
  photos: string[];
  address: { street: string; city: string; state: string; postcode: string; country: string };
  verified: boolean;
}

export interface OrganizationResponse {
  count: number;
  total: number;
  items: Organization[];
}

export interface OrganizationDetail extends Organization {
  listings: Listing[];
}

export interface ListingFilters {
  species?: string;
  age?: string;
  sex?: string;
  size?: string;
  status?: string;
  country?: string;
  organizationSourceId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

const api = createApiClient(ANIMALS_SERVICE_URL ?? "");

function toQuery(params: Record<string, string | number | undefined>): string {
  const searchParameters = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") searchParameters.set(key, String(value));
  }
  return searchParameters.toString();
}

export async function fetchListings(filters: ListingFilters = {}): Promise<ListingResponse> {
  return api.get<ListingResponse>(`/listings?${toQuery({ ...filters })}`);
}

export async function fetchListing(id: string): Promise<Listing> {
  return api.get<Listing>(`/listings/${id}`);
}

export async function fetchListingStats(): Promise<ListingStats> {
  return api.get<ListingStats>("/listings/stats");
}

export async function fetchOrganizations(params?: {
  search?: string;
  country?: string;
  limit?: number;
  offset?: number;
}): Promise<OrganizationResponse> {
  return api.get<OrganizationResponse>(`/organizations?${toQuery({ ...params })}`);
}

export async function fetchOrganization(id: string): Promise<OrganizationDetail> {
  return api.get<OrganizationDetail>(`/organizations/${id}`);
}
