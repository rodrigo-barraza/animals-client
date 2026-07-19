"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Search, ShieldCheck } from "lucide-react";
import {
  EmptyStateComponent,
  LoadingStateComponent,
  PageHeroComponent,
  PaginationComponent,
  SearchInputComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import { fetchOrganizations, type Organization } from "@/services/ListingsService";

const PAGE_SIZE = 24;

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchOrganizations({
        search: submittedSearch || undefined,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      });
      setOrganizations(response.items);
      setTotal(response.total);
    } catch {
      setOrganizations([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [submittedSearch, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <PageHeroComponent
          icon={Building2}
          title="Shelters & Rescues"
          subtitle="The organizations doing the work on the ground"
          stats={total > 0 ? [{ value: total.toLocaleString(), label: "organizations" }] : undefined}
        />

        <div className="listing-toolbar">
          <SearchInputComponent
            value={search}
            onChange={(value: string) => setSearch(value)}
            onSubmit={(value: string) => {
              setSubmittedSearch(value);
              setPage(1);
            }}
            placeholder="Search organizations…"
            leadingIcon={<Search size={16} />}
            compact
          />
        </div>

        {loading ? (
          <LoadingStateComponent message="Loading organizations…" />
        ) : organizations.length === 0 ? (
          <EmptyStateComponent icon="🏠" title="No organizations yet" subtitle="Organizations appear after the first listings sync or seed." />
        ) : (
          <>
            <div className="org-grid">
              {organizations.map((org) => (
                <Link key={org._id} href={`/organizations/${org._id}`} className="org-card">
                  <h3>
                    {org.name}
                    {org.verified && <ShieldCheck size={14} className="org-verified" aria-label="Verified partner" />}
                  </h3>
                  <p className="org-location">
                    {[org.address.city, org.address.state, org.address.country].filter(Boolean).join(", ")}
                  </p>
                  {org.description && <p className="org-description">{org.description}</p>}
                </Link>
              ))}
            </div>
            <PaginationComponent
              page={page}
              totalPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
              totalItems={total}
              limit={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </main>
    </PageLayoutComponent>
  );
}
