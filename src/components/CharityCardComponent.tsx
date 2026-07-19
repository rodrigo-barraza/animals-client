"use client";

import { ExternalLink, HeartHandshake } from "lucide-react";
import { ButtonComponent } from "@rodrigo-barraza/components-library";
import type { Charity } from "@/services/CharitiesService";

const PROVIDER_LABELS: Record<string, string> = {
  everyorg: "via Every.org",
  globalgiving: "via GlobalGiving",
  curated: "",
};

/**
 * CharityCardComponent — A giving-directory card. The donate button
 * always leaves the site: providers process the donation end-to-end.
 */
export default function CharityCardComponent({ charity }: { charity: Charity }) {
  return (
    <div className="charity-card">
      <div className="charity-card-header">
        <h3 className="charity-name">{charity.name}</h3>
        {charity.country && <span className="charity-country">{charity.country}</span>}
      </div>
      {charity.description && <p className="charity-description">{charity.description}</p>}
      <div className="charity-card-footer">
        <ButtonComponent
          variant="filled"
          size="small"
          icon={HeartHandshake}
          onClick={() => window.open(charity.donateUrl, "_blank", "noopener")}
        >
          Donate
        </ButtonComponent>
        {charity.websiteUrl && (
          <a className="charity-website" href={charity.websiteUrl} target="_blank" rel="noreferrer noopener">
            Website <ExternalLink size={12} />
          </a>
        )}
        {PROVIDER_LABELS[charity.provider] && <span className="charity-provider">{PROVIDER_LABELS[charity.provider]}</span>}
      </div>
    </div>
  );
}
