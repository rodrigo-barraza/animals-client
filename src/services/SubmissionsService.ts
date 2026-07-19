// ─── Submissions Service Client ─────────────────────────────
// Shelter/rescue self-serve interest form.
// ─────────────────────────────────────────────────────────────

import { createApiClient } from "@rodrigo-barraza/utilities-library";

import { ANIMALS_SERVICE_URL } from "@/config";

export interface SubmissionData {
  organizationName: string;
  contactName?: string;
  email: string;
  website?: string;
  country?: string;
  city?: string;
  message?: string;
  /** Honeypot — must stay empty; bots that fill it are silently dropped. */
  website2?: string;
}

const api = createApiClient(ANIMALS_SERVICE_URL ?? "");

export async function submitShelterInterest(data: SubmissionData): Promise<{ success: boolean; id?: string }> {
  return api.post<{ success: boolean; id?: string }>("/submissions", data);
}
