"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  EmptyStateComponent,
  LoadingStateComponent,
  PageHeroComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import ListingCardComponent from "@/components/ListingCardComponent";
import { useFavorites } from "@/hooks/useFavorites";
import { fetchListing, type Listing } from "@/services/ListingsService";

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite, mounted } = useFavorites();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    if (favorites.length === 0) {
      setListings([]);
      setLoading(false);
      return;
    }
    // Fetch each favorite; drop ones that no longer exist (adopted!).
    Promise.allSettled(favorites.map((id) => fetchListing(id))).then((outcomes) => {
      setListings(
        outcomes
          .filter((outcome): outcome is PromiseFulfilledResult<Listing> => outcome.status === "fulfilled")
          .map((outcome) => outcome.value),
      );
      setLoading(false);
    });
    // Refetch only when the id set changes, not on every toggle re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, favorites.join(",")]);

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <PageHeroComponent
          icon={Heart}
          title="Favorites"
          subtitle="Saved on this device — no account needed"
          stats={favorites.length > 0 ? [{ value: favorites.length, label: "saved" }] : undefined}
        />

        {!mounted || loading ? (
          <LoadingStateComponent message="Loading favorites…" />
        ) : listings.length === 0 ? (
          <EmptyStateComponent
            icon="💚"
            title="No favorites yet"
            subtitle="Tap the heart on any animal to keep track of them here."
          >
            <Link href="/adopt" className="section-link">Browse adoptable animals →</Link>
          </EmptyStateComponent>
        ) : (
          <div className="animal-grid">
            {listings.map((listing) => (
              <ListingCardComponent
                key={listing._id}
                listing={listing}
                isFavorite={isFavorite(listing._id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </main>
    </PageLayoutComponent>
  );
}
