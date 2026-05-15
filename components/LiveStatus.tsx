"use client";

import { useEffect, useMemo, useState } from "react";
import type { PublicStatus } from "@/lib/status";
import { formatBytes, formatCompactNumber, stateLabel } from "@/lib/status";

type Props = {
  initialStatus: PublicStatus;
};

function timeAgo(iso: string) {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

function stateSentence(status: PublicStatus) {
  if (!status.ok) return "The public status collector could not reach the node.";
  if (status.state === "synced") return "Block delay is low across reported shards.";
  if (status.state === "catching_up") return "The node is online and still reducing delay.";
  return "The node answered, but delay is higher than expected.";
}

export function LiveStatus({ initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [lastRefresh, setLastRefresh] = useState(new Date().toISOString());

  useEffect(() => {
    let active = true;

    async function refresh() {
      try {
        const response = await fetch("/api/status", { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const next = (await response.json()) as PublicStatus;
        if (active) {
          setStatus(next);
          setLastRefresh(new Date().toISOString());
        }
      } catch {
        if (active) {
          setStatus((current) => ({
            ...current,
            ok: false,
            state: "offline",
            checkedAt: new Date().toISOString(),
            error: "browser refresh failed",
          }));
          setLastRefresh(new Date().toISOString());
        }
      }
    }

    const interval = window.setInterval(refresh, 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const maxHeight = useMemo(
    () => Math.max(0, ...status.shards.map((shard) => shard.maxHeight)),
    [status.shards],
  );

  return (
    <section className="status-panel" aria-label="Ardea live node status">
      <div className="status-panel__top">
        <div>
          <p className="eyebrow">Live node status</p>
          <h2>Ardea is {stateLabel(status.state).toLowerCase()}.</h2>
          <p>{stateSentence(status)}</p>
        </div>
        <div className={`status-pill status-pill--${status.state}`}>
          <span aria-hidden="true" />
          {stateLabel(status.state)}
        </div>
      </div>

      <div className="metric-grid">
        <Metric label="Version" value={status.version || "—"} />
        <Metric label="Messages indexed" value={formatCompactNumber(status.messages)} />
        <Metric label="FID registrations" value={formatCompactNumber(status.fidRegistrations)} />
        <Metric label="Database size" value={formatBytes(status.approxSizeBytes)} />
        <Metric label="Reported shards" value={String(status.shardCount || status.shards.length || "—")} />
        <Metric label="Max block delay" value={status.maxBlockDelay === null ? "—" : String(status.maxBlockDelay)} />
        <Metric label="Highest block" value={maxHeight ? formatCompactNumber(maxHeight) : "—"} />
        <Metric label="Checked" value={timeAgo(status.checkedAt || lastRefresh)} />
      </div>

      <div className="shards" aria-label="Shard status">
        {status.shards.length ? (
          status.shards.map((shard) => (
            <div className="shard" key={shard.id}>
              <div className="shard__head">
                <span>Shard {shard.id}</span>
                <strong>{shard.blockDelay} delay</strong>
              </div>
              <div className="shard__bar" aria-hidden="true">
                <span style={{ width: `${Math.max(6, Math.min(100, 100 - shard.blockDelay * 3))}%` }} />
              </div>
              <div className="shard__meta">
                <span>{formatCompactNumber(shard.maxHeight)} height</span>
                <span>{formatBytes(shard.approxSizeBytes)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="quiet">No shard data returned yet.</p>
        )}
      </div>

      <p className="status-note">
        This feed is sanitized. It does not expose SSH, Grafana, private hostnames, tokens, or operator credentials.
      </p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
