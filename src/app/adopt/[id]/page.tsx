"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Building2, Check, ExternalLink, Heart, Minus, X } from "lucide-react";
import {
  ButtonComponent,
  EmptyStateComponent,
  LoadingStateComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import { useFavorites } from "@/hooks/useFavorites";
import {
  AGE_LABELS,
  ATTRIBUTE_LABELS,
  SEX_LABELS,
  SIZE_LABELS,
  SOURCE_LABELS,
  SPECIES_EMOJIS,
  SPECIES_LABELS,
  STATUS_LABELS,
} from "@/constants";
import {
  fetchListing,
  fetchOrganization,
  type Listing,
  type Organization,
} from "@/services/ListingsService";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!params?.id) return;
    fetchListing(params.id)
      .then(async (data) => {
        setListing(data);
        if (data.organizationSourceId) {
          try {
            setOrganization(await fetchOrganization(data.organizationSourceId));
          } catch {
            // Org may not be synced yet — the listing still renders.
          }
        }
      })
      .catch(() => setListing(null))
      .finally(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <PageLayoutComponent>
        <main className="page-content"><LoadingStateComponent message="Loading listing…" /></main>
      </PageLayoutComponent>
    );
  }

  if (!listing) {
    return (
      <PageLayoutComponent>
        <main className="page-content">
          <EmptyStateComponent icon="🐾" title="Listing not found" subtitle="It may have been adopted already — the best possible reason for a 404.">
            <Link href="/adopt" className="section-link">← Back to browse</Link>
          </EmptyStateComponent>
        </main>
      </PageLayoutComponent>
    );
  }

  const breedLine = [listing.breed, listing.breedSecondary, listing.mixedBreed ? "Mix" : ""].filter(Boolean).join(" / ");
  const metaLine = [
    SPECIES_LABELS[listing.species] || listing.species,
    breedLine,
    AGE_LABELS[listing.age],
    SEX_LABELS[listing.sex],
    SIZE_LABELS[listing.size],
  ].filter((part) => part && !part.startsWith("Unknown")).join(" · ");
  const locationLine = [listing.location.city, listing.location.state, listing.location.country].filter(Boolean).join(", ");
  const knownAttributes = Object.entries(listing.attributes).filter(([, value]) => value !== null);
  const favorite = isFavorite(listing._id);

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <Link href="/adopt" className="back-link"><ArrowLeft size={14} /> All animals</Link>

        <div className="listing-detail">
          <div className="listing-detail-photos">
            {listing.photos.length > 0 ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- external shelter CDNs */}
                <img className="listing-detail-photo" src={listing.photos[photoIndex]} alt={listing.name} />
                {listing.photos.length > 1 && (
                  <div className="listing-thumbs">
                    {listing.photos.map((photo, index) => (
                      // eslint-disable-next-line @next/next/no-img-element -- external shelter CDNs
                      <img
                        key={photo}
                        src={photo}
                        alt={`${listing.name} photo ${index + 1}`}
                        className={index === photoIndex ? "active" : ""}
                        onClick={() => setPhotoIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="listing-detail-photo listing-photo-fallback-large">
                {SPECIES_EMOJIS[listing.species] || "🐾"}
              </div>
            )}
          </div>

          <div className="listing-detail-info">
            <div className="listing-detail-title">
              <h1>{listing.name}</h1>
              <span className={`listing-status-badge ${listing.status}-status`}>
                {STATUS_LABELS[listing.status] || listing.status}
              </span>
            </div>
            <p className="listing-meta">{metaLine}</p>
            {locationLine && <p className="listing-location">{locationLine}</p>}

            <div className="listing-detail-actions">
              {listing.url && (
                <ButtonComponent
                  variant="filled"
                  icon={ExternalLink}
                  onClick={() => window.open(listing.url as string, "_blank", "noopener")}
                >
                  Adopt {listing.name}
                </ButtonComponent>
              )}
              <ButtonComponent
                variant={favorite ? "tonal" : "outlined"}
                icon={Heart}
                onClick={() => toggleFavorite(listing._id)}
              >
                {favorite ? "Favorited" : "Favorite"}
              </ButtonComponent>
            </div>
            {listing.url && (
              <p className="listing-source-note">
                Adoption is handled by the listing shelter{SOURCE_LABELS[listing.source] ? ` on ${SOURCE_LABELS[listing.source]}` : ""} — the button takes you to them.
              </p>
            )}

            {listing.description && <p className="listing-description">{listing.description}</p>}

            {knownAttributes.length > 0 && (
              <div className="listing-attributes">
                {knownAttributes.map(([key, value]) => (
                  <span key={key} className={`listing-attribute ${value ? "yes" : "no"}`}>
                    {value ? <Check size={13} /> : key === "specialNeeds" ? <Minus size={13} /> : <X size={13} />}
                    {ATTRIBUTE_LABELS[key] || key}
                  </span>
                ))}
              </div>
            )}

            {organization && (
              <div className="listing-org-card">
                <h3><Building2 size={15} /> {organization.name}</h3>
                {organization.description && <p>{organization.description}</p>}
                <div className="listing-org-links">
                  <Link href={`/organizations/${organization._id}`} className="section-link">
                    View shelter profile →
                  </Link>
                  {organization.website && (
                    <a href={organization.website} target="_blank" rel="noreferrer noopener" className="section-link">
                      Website <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </PageLayoutComponent>
  );
}
