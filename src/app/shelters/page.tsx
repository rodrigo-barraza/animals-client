"use client";

import { useState } from "react";
import { Handshake, Send } from "lucide-react";
import {
  ButtonComponent,
  InputComponent,
  PageHeroComponent,
} from "@rodrigo-barraza/components-library";
import PageLayoutComponent from "@/components/PageLayoutComponent";
import { submitShelterInterest } from "@/services/SubmissionsService";

export default function SheltersPage() {
  const [organizationName, setOrganizationName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setError(null);
    if (!organizationName.trim() || !email.trim()) {
      setError("Organization name and email are required.");
      return;
    }
    setSubmitting(true);
    try {
      await submitShelterInterest({
        organizationName, contactName, email, website, country, city, message,
        website2: honeypot,
      });
      setSubmitted(true);
    } catch {
      setError("Could not send your submission — please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayoutComponent>
      <main className="page-content">
        <PageHeroComponent
          icon={Handshake}
          title="For Shelters & Rescues"
          subtitle="List your adoptable animals with us — especially if you're outside North America, where the big adoption networks don't reach."
        />

        <section className="section shelters-pitch">
          <div className="home-action-card static">
            <h2>🌍 Worldwide</h2>
            <p>US/CA listings sync automatically from Petfinder and RescueGroups. Everywhere else, we partner with shelters directly — that's you.</p>
          </div>
          <div className="home-action-card static">
            <h2>💸 Free, forever</h2>
            <p>Listing is free. This platform exists to get animals adopted, not to charge the people saving them.</p>
          </div>
          <div className="home-action-card static">
            <h2>🤝 You stay in control</h2>
            <p>Adopters are always sent to you. Your process, your screening, your adoption fee.</p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Get in touch</h2>
          {submitted ? (
            <div className="placeholder-section">
              <span className="animal-emoji">💚</span>
              <p>Thank you! We&apos;ve received your submission and will reach out at {email} once it&apos;s reviewed.</p>
            </div>
          ) : (
            <form className="shelter-form" onSubmit={submit}>
              <div className="shelter-form-grid">
                <InputComponent label="Organization name *" value={organizationName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrganizationName(e.target.value)} placeholder="Happy Tails Rescue" />
                <InputComponent label="Contact name" value={contactName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactName(e.target.value)} placeholder="Jane Doe" />
                <InputComponent label="Email *" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@rescue.org" />
                <InputComponent label="Website" value={website} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)} placeholder="https://…" />
                <InputComponent label="Country" value={country} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} placeholder="Thailand" />
                <InputComponent label="City" value={city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} placeholder="Bangkok" />
              </div>
              <label className="shelter-form-message">
                <span>About your organization</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="How many animals do you care for? What kinds? Anything else we should know?"
                />
              </label>
              {/* Honeypot — hidden from humans, bots fill it and get silently dropped */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hp-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              {error && <p className="shelter-form-error">{error}</p>}
              <ButtonComponent variant="filled" icon={Send} loading={submitting} disabled={submitting} onClick={submit}>
                Submit
              </ButtonComponent>
            </form>
          )}
        </section>
      </main>
    </PageLayoutComponent>
  );
}
