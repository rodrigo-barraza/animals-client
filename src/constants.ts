// ─── Constants ──────────────────────────────────────────────

export const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/", icon: "House" },
  { id: "adopt", label: "Adopt", href: "/adopt", icon: "PawPrint" },
  { id: "organizations", label: "Shelters & Rescues", href: "/organizations", icon: "Building2" },
  { id: "donate", label: "Donate", href: "/donate", icon: "HeartHandshake" },
  { id: "favorites", label: "Favorites", href: "/favorites", icon: "Heart" },
  { id: "shelters", label: "For Shelters", href: "/shelters", icon: "Handshake" },
];

// ─── Adoption Listings ──────────────────────────────────────

export const SPECIES_LABELS: Record<string, string> = {
  dog: "Dogs",
  cat: "Cats",
  rabbit: "Rabbits",
  bird: "Birds",
  horse: "Horses",
  small_pet: "Small Pets",
  reptile: "Reptiles",
  barnyard: "Barnyard",
  other: "Other",
};

export const SPECIES_EMOJIS: Record<string, string> = {
  dog: "🐕",
  cat: "🐈",
  rabbit: "🐇",
  bird: "🦜",
  horse: "🐴",
  small_pet: "🐹",
  reptile: "🦎",
  barnyard: "🐐",
  other: "🐾",
};

export const AGE_LABELS: Record<string, string> = {
  baby: "Baby",
  young: "Young",
  adult: "Adult",
  senior: "Senior",
  unknown: "Unknown age",
};

export const SEX_LABELS: Record<string, string> = {
  male: "Male",
  female: "Female",
  unknown: "Unknown",
};

export const SIZE_LABELS: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  xlarge: "Extra Large",
  unknown: "Unknown size",
};

export const STATUS_LABELS: Record<string, string> = {
  adoptable: "Adoptable",
  pending: "Adoption Pending",
  adopted: "Adopted",
  removed: "No Longer Listed",
};

export const SOURCE_LABELS: Record<string, string> = {
  petfinder: "Petfinder",
  rescuegroups: "RescueGroups",
  direct: "Listed with us",
  sample: "Sample data",
};

export const ATTRIBUTE_LABELS: Record<string, string> = {
  spayedNeutered: "Spayed / neutered",
  houseTrained: "House trained",
  specialNeeds: "Special needs",
  shotsCurrent: "Vaccinations current",
  goodWithChildren: "Good with children",
  goodWithDogs: "Good with dogs",
  goodWithCats: "Good with cats",
};

export const FAVORITES_STORAGE_KEY = "animals:favorites";

// ─── Species Catalog (legacy) ───────────────────────────────

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
