import { ImageResponse } from "next/og";

// Tell Next.js to generate this once at build time
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080c10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#70C7BA",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", marginBottom: "auto" }}>
          <div
            style={{
              fontSize: "42px",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              display: "flex",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>LEARN</span>
            <span style={{ color: "#70C7BA" }}>KASPA</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h1
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            What is Kaspa?
          </h1>
          <h2
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#70C7BA",
              lineHeight: 1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Explained for everybody.
          </h2>
        </div>

        {/* Footer Text */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: "28px",
            color: "#8A95A5",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          learnkaspa.com • Pure Public Education
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}