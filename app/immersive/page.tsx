import type { Metadata } from "next";
import ImmersiveHome from "@/components/pages/home/immersive/ImmersiveHome";

export const metadata: Metadata = {
  title: "Yuvaraj | Immersive",
  description: "An immersive, scroll-driven 3D portfolio experience.",
};

/**
 * Preview route for the immersive redesign. Lives alongside the existing
 * home (`/`) so both can be compared before switching the default.
 * Visit /immersive.
 */
export default function ImmersivePage() {
  return <ImmersiveHome />;
}
