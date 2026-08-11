import { ImageResponse } from "next/og";
import { homeMeta } from "@/content/seo";

export const dynamic = "force-static";
export const alt = homeMeta.title;
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
          justifyContent: "center",
          padding: "80px",
          background: "#08080B",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#2563EB" }}>Bento.</div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
          Your CRM, helpdesk, and invoicing.
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1 }}>
          One record. One login.
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 28, color: "#A1A1AA" }}>
          All-in-one CRM · Sales, support, and billing on one record
        </div>
      </div>
    ),
    { ...size }
  );
}
