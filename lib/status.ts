export type RawShardInfo = {
  shardId?: number;
  maxHeight?: number;
  numMessages?: number;
  numFidRegistrations?: number;
  approxSize?: number;
  blockDelay?: number;
};

export type RawInfo = {
  dbStats?: {
    numMessages?: number;
    numFidRegistrations?: number;
    approxSize?: number;
  };
  numShards?: number;
  shardInfos?: RawShardInfo[];
  version?: string;
  nextEngineVersionTimestamp?: number;
};

export type PublicShard = {
  id: number;
  maxHeight: number;
  blockDelay: number;
  messages: number;
  approxSizeBytes: number;
};

export type PublicStatus = {
  ok: boolean;
  state: "synced" | "catching_up" | "degraded" | "offline" | "retired";
  checkedAt: string;
  retiredAt?: string;
  version: string | null;
  messages: number;
  fidRegistrations: number;
  approxSizeBytes: number;
  shardCount: number;
  maxBlockDelay: number | null;
  shards: PublicShard[];
  error?: string;
};

const RETIRED_AT = "2026-06-18T23:15:00Z";

function toNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function sanitizeInfo(raw: RawInfo, checkedAt = new Date()): PublicStatus {
  const shards = [...(raw.shardInfos || [])]
    .map((shard) => ({
      id: toNumber(shard.shardId),
      maxHeight: toNumber(shard.maxHeight),
      blockDelay: toNumber(shard.blockDelay),
      messages: toNumber(shard.numMessages),
      approxSizeBytes: toNumber(shard.approxSize),
    }))
    .sort((a, b) => a.id - b.id);

  const maxBlockDelay = shards.length
    ? Math.max(...shards.map((shard) => shard.blockDelay))
    : null;

  const state: PublicStatus["state"] =
    maxBlockDelay === null
      ? "degraded"
      : maxBlockDelay <= 20
        ? "synced"
        : maxBlockDelay <= 5_000
          ? "catching_up"
          : "degraded";

  return {
    ok: true,
    state,
    checkedAt: checkedAt.toISOString(),
    version: typeof raw.version === "string" ? raw.version : null,
    messages: toNumber(raw.dbStats?.numMessages),
    fidRegistrations: toNumber(raw.dbStats?.numFidRegistrations),
    approxSizeBytes: toNumber(raw.dbStats?.approxSize),
    shardCount: shards.length || toNumber(raw.numShards),
    maxBlockDelay,
    shards,
  };
}

export async function fetchPublicStatus(): Promise<PublicStatus> {
  return {
    ok: true,
    state: "retired",
    checkedAt: new Date().toISOString(),
    retiredAt: RETIRED_AT,
    version: null,
    messages: 0,
    fidRegistrations: 0,
    approxSizeBytes: 0,
    shardCount: 0,
    maxBlockDelay: null,
    shards: [],
  };
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: value >= 1_000_000 ? 1 : 0,
  }).format(value);
}

export function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value >= 10 || unit === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
}

export function stateLabel(state: PublicStatus["state"]) {
  switch (state) {
    case "synced":
      return "Synced";
    case "catching_up":
      return "Catching up";
    case "degraded":
      return "Degraded";
    case "offline":
      return "Offline";
    case "retired":
      return "Retired";
  }
}
