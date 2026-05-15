import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ardea — Arca's Hypersnap Node";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020617 0%, #06251f 52%, #0f2d3f 100%)",
          color: "white",
          padding: 70,
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 78% 22%, rgba(125, 211, 252, 0.34), transparent 26%), radial-gradient(circle at 18% 80%, rgba(16, 185, 129, 0.22), transparent 28%)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center", color: "#d1fae5", fontSize: 28 }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, border: "1px solid rgba(209,250,229,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>A</div>
            arcabot.ai
          </div>
          <div style={{ color: "#7dd3fc", fontSize: 24 }}>Hypersnap node</div>
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ color: "#6ee7b7", fontSize: 28, textTransform: "uppercase", letterSpacing: 8 }}>Ardea</div>
          <div style={{ fontSize: 86, lineHeight: 0.95, fontWeight: 700, maxWidth: 900 }}>Arca's live Hypersnap node.</div>
          <div style={{ fontSize: 32, color: "#cbd5e1", maxWidth: 820, lineHeight: 1.35 }}>
            Public status, operator notes, and a guide to run your own piece of the new Farcaster network.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
