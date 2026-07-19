"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, HeartHandshake, PawPrint } from "lucide-react";
import {
  PageHeroComponent,
  StatsCardComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import ListingCardComponent from "@/components/ListingCardComponent";
import { useFavorites } from "@/hooks/useFavorites";
import { SPECIES_LABELS } from "@/constants";
import {
  fetchListings,
  fetchListingStats,
  type Listing,
  type ListingStats,
} from "@/services/ListingsService";

export default function HomePage() {
  const [stats, setStats] = useState<ListingStats | null>(null);
  const [featured, setFeatured] = useState<Listing[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    Promise.allSettled([fetchListingStats(), fetchListings({ limit: 8 })]).then(([statsResult, listingsResult]) => {
      if (statsResult.status === "fulfilled") setStats(statsResult.value);
      if (listingsResult.status === "fulfilled") setFeatured(listingsResult.value.items);
      setLoaded(true);
    });
  }, []);

  const speciesCount = stats ? Object.keys(stats.bySpecies).length : 0;

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <PageHeroComponent
          variant="display"
          icon={PawPrint}
          title="Every animal deserves a home"
          subtitle="Browse adoptable animals from shelters and rescues, support animal charities around the world, and help us connect humans to the animals that need them."
        />

        <section className="section home-actions">
          <Link href="/adopt" className="home-action-card">
            <PawPrint size={28} />
            <h2>Adopt</h2>
            <p>Meet adoptable dogs, cats, and more from shelters and rescues.</p>
          </Link>
          <Link href="/donate" className="home-action-card">
            <HeartHandshake size={28} />
            <h2>Donate</h2>
            <p>Give to vetted animal charities working worldwide.</p>
          </Link>
          <Link href="/shelters" className="home-action-card">
            <Building2 size={28} />
            <h2>For Shelters</h2>
            <p>Run a shelter or rescue? List your animals with us.</p>
          </Link>
        </section>

        {stats && stats.adoptable > 0 && (
          <section className="section">
            <h2 className="section-title">Right now</h2>
            <div className="stats-grid">
              <StatsCardComponent label="Adoptable animals" value={stats.adoptable.toLocaleString()} icon={PawPrint} />
              <StatsCardComponent label="Species" value={speciesCount} subtitle={Object.keys(stats.bySpecies).slice(0, 4).map((species) => SPECIES_LABELS[species] || species).join(", ")} />
              <StatsCardComponent label="Data sources" value={Object.keys(stats.bySource).length} variant="info" />
            </div>
          </section>
        )}

        {featured.length > 0 && (
          <section className="section">
            <div className="section-header-row">
              <h2 className="section-title">Looking for a home</h2>
              <Link href="/adopt" className="section-link">Browse all →</Link>
            </div>
            <div className="animal-grid">
              {featured.map((listing) => (
                <ListingCardComponent
                  key={listing._id}
                  listing={listing}
                  isFavorite={isFavorite(listing._id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {loaded && featured.length === 0 && (
          <section className="section">
            <div className="placeholder-section">
              <span className="animal-emoji">🐾</span>
              <p>
                No listings yet. Run <code>npm run seed</code> in animals-service for sample data, or configure a
                Petfinder / RescueGroups API key to sync real adoptable animals.
              </p>
            </div>
          </section>
        )}
      </main>
    </PageLayoutComponent>
  );
}
