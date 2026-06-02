// ─── Constants ──────────────────────────────────────────────

export const CONSERVATION_STATUS_LABELS: Record<string, string> = {
  least_concern: "Least Concern",
  near_threatened: "Near Threatened",
  vulnerable: "Vulnerable",
  endangered: "Endangered",
  critically_endangered: "Critically Endangered",
  extinct_in_wild: "Extinct in Wild",
  extinct: "Extinct",
};

export const CONSERVATION_STATUS_COLORS: Record<string, string> = {
  least_concern: "hsl(150, 70%, 45%)",
  near_threatened: "hsl(60, 70%, 45%)",
  vulnerable: "hsl(40, 70%, 50%)",
  endangered: "hsl(20, 80%, 50%)",
  critically_endangered: "hsl(0, 70%, 50%)",
  extinct_in_wild: "hsl(280, 50%, 45%)",
  extinct: "hsl(0, 0%, 45%)",
};

export const ANIMAL_CLASS_LABELS: Record<string, string> = {
  mammal: "Mammal",
  bird: "Bird",
  reptile: "Reptile",
  amphibian: "Amphibian",
  fish: "Fish",
  invertebrate: "Invertebrate",
};

export const ANIMAL_CLASS_EMOJIS: Record<string, string> = {
  mammal: "🦁",
  bird: "🦅",
  reptile: "🦎",
  amphibian: "🐸",
  fish: "🐠",
  invertebrate: "🦋",
};
