"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Mail, Phone, ShieldCheck } from "lucide-react";
import {
  EmptyStateComponent,
  LoadingStateComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import ListingCardComponent from "@/components/ListingCardComponent";
import { useFavorites } from "@/hooks/useFavorites";
import { fetchOrganization, type OrganizationDetail } from "@/services/ListingsService";

export default function OrganizationDetailPage() {
  const params = useParams<{ id: string }>();
  const [organization, setOrganization] = useState<OrganizationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!params?.id) return;
    fetchOrganization(params.id)
      .then(setOrganization)
      .catch(() => setOrganization(null))
      .finally(() => setLoading(false));
  }, [params?.id]);

  if (loading) {
    return (
      <PageLayoutComponent>
        <main className="page-content"><LoadingStateComponent message="Loading organization…" /></main>
      </PageLayoutComponent>
    );
  }

  if (!organization) {
    return (
      <PageLayoutComponent>
        <main className="page-content">
          <EmptyStateComponent icon="🏠" title="Organization not found">
            <Link href="/organizations" className="section-link">← All organizations</Link>
          </EmptyStateComponent>
        </main>
      </PageLayoutComponent>
    );
  }

  const locationLine = [organization.address.city, organization.address.state, organization.address.country]
    .filter(Boolean)
    .join(", ");

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <Link href="/organizations" className="back-link"><ArrowLeft size={14} /> All organizations</Link>

        <div className="org-detail-header">
          <h1>
            {organization.name}
            {organization.verified && <ShieldCheck size={18} className="org-verified" aria-label="Verified partner" />}
          </h1>
          {locationLine && <p className="org-location">{locationLine}</p>}
          {organization.description && <p className="org-description-full">{organization.description}</p>}
          <div className="org-contact-row">
            {organization.website && (
              <a href={organization.website} target="_blank" rel="noreferrer noopener" className="section-link">
                Website <ExternalLink size={12} />
              </a>
            )}
            {organization.email && (
              <a href={`mailto:${organization.email}`} className="section-link"><Mail size={12} /> {organization.email}</a>
            )}
            {organization.phone && (
              <span className="section-link"><Phone size={12} /> {organization.phone}</span>
            )}
          </div>
        </div>

        <section className="section">
          <h2 className="section-title">Their adoptable animals</h2>
          {organization.listings.length === 0 ? (
            <EmptyStateComponent icon="🐾" title="No current listings" subtitle="Check back soon." />
          ) : (
            <div className="animal-grid">
              {organization.listings.map((listing) => (
                <ListingCardComponent
                  key={listing._id}
                  listing={listing}
                  isFavorite={isFavorite(listing._id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </PageLayoutComponent>
  );
}
