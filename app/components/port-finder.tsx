"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export type PortSearchItem = {
  slug: string;
  name: string;
  country: string;
  region: string;
  topPick: string;
};

type PortFinderProps = {
  ports: PortSearchItem[];
};

const normalize = (value: string) => value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function PortFinder({ ports }: PortFinderProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query.trim());

  const results = normalizedQuery
    ? ports.filter((port) =>
        normalize(`${port.name} ${port.country} ${port.region} ${port.topPick}`).includes(normalizedQuery),
      ).slice(0, 7)
    : [];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (results[0]) router.push(`/ports/${results[0].slug}`);
  }

  return (
    <div className="cse-port-finder">
      <form onSubmit={handleSubmit} role="search">
        <label htmlFor="port-search">Search all 60 port guides</label>
        <div className="cse-port-search-field">
          <span aria-hidden="true">⌕</span>
          <input
            id="port-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter a port, country or region"
            autoComplete="off"
            aria-describedby="port-search-help"
          />
          {query ? <button type="button" onClick={() => setQuery("")}>Clear</button> : null}
        </div>
        <p id="port-search-help">Try “Cozumel”, “Italy”, “Alaska” or an activity such as “snorkel”.</p>
      </form>

      <div className="cse-port-search-results" aria-live="polite">
        {normalizedQuery && results.length > 0 ? (
          <>
            <p>{results.length === 7 ? "Top matching ports" : `${results.length} matching ${results.length === 1 ? "port" : "ports"}`}</p>
            <div>
              {results.map((port) => (
                <Link href={`/ports/${port.slug}`} key={port.slug}>
                  <span>{port.country} · {port.region}</span>
                  <strong>{port.name}</strong>
                  <small>{port.topPick}</small>
                  <b>View guide →</b>
                </Link>
              ))}
            </div>
          </>
        ) : normalizedQuery ? (
          <div className="cse-port-search-empty">
            <strong>No matching port yet.</strong>
            <Link href="/ports">Browse the complete directory →</Link>
          </div>
        ) : (
          <p className="cse-port-search-prompt">Start typing to go directly to the right port guide.</p>
        )}
      </div>
    </div>
  );
}
