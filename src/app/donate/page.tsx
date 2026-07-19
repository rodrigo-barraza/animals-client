"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Search } from "lucide-react";
import {
  EmptyStateComponent,
  LoadingStateComponent,
  PageHeroComponent,
  SearchInputComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import CharityCardComponent from "@/components/CharityCardComponent";
import {
  fetchCharityCollections,
  searchCharities,
  type Charity,
  type CharityCollection,
} from "@/services/CharitiesService";

export default function DonatePage() {
  const [collections, setCollections] = useState<CharityCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Charity[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [liveProviders, setLiveProviders] = useState(false);

  useEffect(() => {
    fetchCharityCollections()
      .then((response) => setCollections(response.items))
      .catch(() => setCollections([]))
      .finally(() => setLoading(false));
  }, []);

  const runSearch = async (query: string) => {
    if (!query.trim()) {
      setResults(null);
      return;
    }
    setSearching(true);
    try {
      const response = await searchCharities(query.trim());
      setResults(response.items);
      setLiveProviders(response.providers.everyorg || response.providers.globalgiving);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <PageHeroComponent
          icon={HeartHandshake}
          title="Donate"
          subtitle="Support the people helping animals — locally and around the world. Donations go directly through Every.org or GlobalGiving; we never touch the money."
        />

        <div className="listing-toolbar">
          <SearchInputComponent
            value={search}
            onChange={(value: string) => {
              setSearch(value);
              if (!value) setResults(null);
            }}
            onSubmit={runSearch}
            placeholder="Search animal charities…"
            leadingIcon={<Search size={16} />}
            compact
          />
        </div>

        {searching ? (
          <LoadingStateComponent message="Searching charities…" />
        ) : results !== null ? (
          <section className="section">
            <h2 className="section-title">Search results</h2>
            {!liveProviders && results.length > 0 && (
              <p className="charity-note">
                Showing curated matches — configure an Every.org or GlobalGiving API key in animals-service for live
                search across a million nonprofits.
              </p>
            )}
            {results.length === 0 ? (
              <EmptyStateComponent icon="💝" title="No charities found" subtitle="Try a different search term." />
            ) : (
              <div className="charity-grid">
                {results.map((charity) => (
                  <CharityCardComponent key={`${charity.provider}:${charity.id}`} charity={charity} />
                ))}
              </div>
            )}
          </section>
        ) : loading ? (
          <LoadingStateComponent message="Loading collections…" />
        ) : (
          collections.map((collection) => (
            <section className="section" key={collection.slug}>
              <h2 className="section-title">
                {collection.emoji} {collection.title}
              </h2>
              <p className="charity-collection-description">{collection.description}</p>
              <div className="charity-grid">
                {collection.charities.map((charity) => (
                  <CharityCardComponent key={`${charity.provider}:${charity.id}`} charity={charity} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </PageLayoutComponent>
  );
}
