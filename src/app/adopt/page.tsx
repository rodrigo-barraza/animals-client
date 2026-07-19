"use client";

import { useCallback, useEffect, useState } from "react";
import { PawPrint, Search } from "lucide-react";
import {
  ChipComponent,
  EmptyStateComponent,
  LoadingStateComponent,
  PageHeroComponent,
  PaginationComponent,
  SearchInputComponent,
  SelectComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import ListingCardComponent from "@/components/ListingCardComponent";
import { useFavorites } from "@/hooks/useFavorites";
import { AGE_LABELS, SEX_LABELS, SIZE_LABELS, SPECIES_EMOJIS, SPECIES_LABELS } from "@/constants";
import { fetchListings, type Listing } from "@/services/ListingsService";

const PAGE_SIZE = 24;
const ANY = "";

function selectOptions(labels: Record<string, string>, anyLabel: string) {
  return [
    { value: ANY, label: anyLabel },
    ...Object.entries(labels)
      .filter(([value]) => value !== "unknown")
      .map(([value, label]) => ({ value, label })),
  ];
}

export default function AdoptPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [species, setSpecies] = useState(ANY);
  const [age, setAge] = useState(ANY);
  const [sex, setSex] = useState(ANY);
  const [size, setSize] = useState(ANY);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const { isFavorite, toggleFavorite } = useFavorites();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchListings({
        species: species || undefined,
        age: age || undefined,
        sex: sex || undefined,
        size: size || undefined,
        search: submittedSearch || undefined,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      });
      setListings(response.items);
      setTotal(response.total);
    } catch {
      setError("Could not load listings. Is animals-service running?");
    } finally {
      setLoading(false);
    }
  }, [species, age, sex, size, submittedSearch, page]);

  useEffect(() => {
    load();
  }, [load]);

  const changeFilter = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <PageHeroComponent
          icon={PawPrint}
          title="Adopt"
          subtitle="Adoptable animals from shelters and rescues"
          stats={total > 0 ? [{ value: total.toLocaleString(), label: "available" }] : undefined}
        />

        <div className="species-chips">
          {Object.entries(SPECIES_LABELS).map(([value, label]) => (
            <ChipComponent
              key={value}
              variant="filter"
              selected={species === value}
              onClick={() => changeFilter(setSpecies)(species === value ? ANY : value)}
            >
              {SPECIES_EMOJIS[value]} {label}
            </ChipComponent>
          ))}
        </div>

        <div className="listing-toolbar">
          <SearchInputComponent
            value={search}
            onChange={(value: string) => setSearch(value)}
            onSubmit={(value: string) => {
              setSubmittedSearch(value);
              setPage(1);
            }}
            placeholder="Search by name, breed…"
            leadingIcon={<Search size={16} />}
            compact
          />
          <SelectComponent value={age} options={selectOptions(AGE_LABELS, "Any age")} onChange={changeFilter(setAge)} placeholder="Any age" />
          <SelectComponent value={sex} options={selectOptions(SEX_LABELS, "Any sex")} onChange={changeFilter(setSex)} placeholder="Any sex" />
          <SelectComponent value={size} options={selectOptions(SIZE_LABELS, "Any size")} onChange={changeFilter(setSize)} placeholder="Any size" />
        </div>

        {loading ? (
          <LoadingStateComponent message="Fetching adoptable animals…" />
        ) : error ? (
          <EmptyStateComponent icon="🛰️" title="Something went wrong" subtitle={error} />
        ) : listings.length === 0 ? (
          <EmptyStateComponent
            icon="🐾"
            title="No animals match"
            subtitle="Try clearing a filter — or seed the service with sample data (npm run seed)."
          />
        ) : (
          <>
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
