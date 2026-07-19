"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { AGE_LABELS, SEX_LABELS, SPECIES_EMOJIS, STATUS_LABELS } from "@/constants";
import type { Listing } from "@/services/ListingsService";

function locationLine(listing: Listing): string {
  const parts = [listing.location.city, listing.location.state, listing.location.country].filter(Boolean);
  return parts.join(", ");
}

/**
 * ListingCardComponent — Adoptable-animal card for browse grids.
 */
export default function ListingCardComponent({
  listing,
  isFavorite,
  onToggleFavorite,
}: {
  listing: Listing;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}) {
  const breed = [listing.breed, listing.mixedBreed ? "Mix" : ""].filter(Boolean).join(" ");

  return (
    <Link href={`/adopt/${listing._id}`} className="animal-card listing-card">
      <div className="listing-photo">
        {listing.photos[0] ? (
          // eslint-disable-next-line @next/next/no-img-element -- external shelter CDNs; domains unknown ahead of time
          <img src={listing.photos[0]} alt={listing.name} loading="lazy" />
        ) : (
          <span className="listing-photo-fallback">{SPECIES_EMOJIS[listing.species] || "🐾"}</span>
        )}
        {onToggleFavorite && (
          <button
            type="button"
            className={`listing-favorite${isFavorite ? " active" : ""}`}
            aria-label={isFavorite ? `Remove ${listing.name} from favorites` : `Add ${listing.name} to favorites`}
            onClick={(event) => {
              event.preventDefault();
              onToggleFavorite(listing._id);
            }}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}
        {listing.status !== "adoptable" && (
          <span className={`listing-status-badge ${listing.status}-status`}>{STATUS_LABELS[listing.status] || listing.status}</span>
        )}
      </div>
      <div className="listing-body">
        <div className="listing-title-row">
          <h3 className="listing-name">{listing.name}</h3>
          <span className="listing-species">{SPECIES_EMOJIS[listing.species] || "🐾"}</span>
        </div>
        <p className="listing-meta">
          {[breed, AGE_LABELS[listing.age], SEX_LABELS[listing.sex]].filter((part) => part && !part.startsWith("Unknown")).join(" · ")}
        </p>
        {locationLine(listing) && <p className="listing-location">{locationLine(listing)}</p>}
      </div>
    </Link>
  );
}
