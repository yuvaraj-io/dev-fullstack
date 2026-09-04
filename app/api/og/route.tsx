import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Learn Full-Stack Development";
    const topic = searchParams.get("topic") || "Engineering Track";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 80px",
            backgroundColor: "#090d16",
            backgroundImage:
              "radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.25) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(20, 184, 166, 0.15) 0%, transparent 60%)",
            color: "#ffffff",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: "#6366f1",
                }}
              />
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  color: "#ffffff",
                }}
              >
                YUVARAJ.IO
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                border: "1px solid rgba(99, 102, 241, 0.4)",
                fontSize: "15px",
                fontWeight: 700,
                color: "#818cf8",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {topic}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
            <h1
              style={{
                fontSize: "52px",
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                color: "#f8fafc",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "#94a3b8",
                margin: 0,
                fontWeight: 400,
              }}
            >
              Interactive Guide & Technical Architecture Breakdown
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                Y
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "17px", fontWeight: 700, color: "#f1f5f9" }}>
                  Yuvaraj
                </span>
                <span style={{ fontSize: "14px", color: "#64748b" }}>
                  Staff Architect & Full-Stack Lead
                </span>
              </div>
            </div>

            <div style={{ fontSize: "16px", fontWeight: 600, color: "#6366f1" }}>
              yuvaraj.io/learn
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : "Internal Error";
    return new Response(`Failed to generate image: ${errorMsg}`, { status: 500 });
  }
}