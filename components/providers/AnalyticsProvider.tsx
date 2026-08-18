"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Generate or get visitor ID
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem("visitor_id", visitorId as string);
    }
    
    const finalVisitorId = visitorId as string;

    // Send analytics track request
    const trackVisit = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            visitorId: finalVisitorId,
            path: pathname,
          }),
        });
      } catch (error) {
        // Silently fail if tracking is blocked
        console.error("Failed to track visit", error);
      }
    };

    trackVisit();
  }, [pathname]); // Re-run on every path change

  return <>{children}</>;
}
