// ─── Animals Service Client ─────────────────────────────────

import { ANIMALS_SERVICE_URL } from "@/config";

interface AnimalResponse {
  count: number;
  total: number;
  items: Animal[];
}

interface Animal {
  _id: string;
  commonName: string;
  scientificName: string;
  slug: string;
  animalClass: string;
  conservationStatus: string;
  habitat: string;
  diet: string;
  description: string;
  imageUrl: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface SightingResponse {
  count: number;
  total: number;
  items: Sighting[];
}

interface Sighting {
  _id: string;
  animalId: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  notes: string;
  spottedBy: string;
  spottedAt: string;
  createdAt: string;
}

export async function fetchAnimals(params?: {
  animalClass?: string;
  conservationStatus?: string;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<AnimalResponse> {
  const searchParameters = new URLSearchParams();
  if (params?.animalClass) searchParameters.set("animalClass", params.animalClass);
  if (params?.conservationStatus) searchParameters.set("conservationStatus", params.conservationStatus);
  if (params?.search) searchParameters.set("search", params.search);
  if (params?.limit) searchParameters.set("limit", String(params.limit));
  if (params?.offset) searchParameters.set("offset", String(params.offset));

  const response = await fetch(`${ANIMALS_SERVICE_URL}/animals?${searchParameters}`);
  if (!response.ok) throw new Error(`Failed to fetch animals: ${response.status}`);
  return response.json();
}

export async function fetchAnimal(identifier: string): Promise<Animal> {
  const response = await fetch(`${ANIMALS_SERVICE_URL}/animals/${identifier}`);
  if (!response.ok) throw new Error(`Failed to fetch animal: ${response.status}`);
  return response.json();
}

export async function fetchSightings(params?: {
  animalId?: string;
  limit?: number;
  offset?: number;
}): Promise<SightingResponse> {
  const searchParameters = new URLSearchParams();
  if (params?.animalId) searchParameters.set("animalId", params.animalId);
  if (params?.limit) searchParameters.set("limit", String(params.limit));
  if (params?.offset) searchParameters.set("offset", String(params.offset));

  const response = await fetch(`${ANIMALS_SERVICE_URL}/sightings?${searchParameters}`);
  if (!response.ok) throw new Error(`Failed to fetch sightings: ${response.status}`);
  return response.json();
}

export type { Animal, AnimalResponse, Sighting, SightingResponse };
