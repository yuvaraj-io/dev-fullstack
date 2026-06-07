import ImmersiveHome from "@/components/pages/home/immersive/ImmersiveHome";

/**
 * Home → the immersive, scroll-driven 3D experience.
 *
 * The previous static sections still live under `components/pages/home/`
 * (HeroSection, PortfolioSection, Skills, AboutSection, ConnectMeSection)
 * and can be restored here at any time. The immersive build is also
 * mirrored at `/immersive`.
 */
export default function Home() {
  return <ImmersiveHome />;
}
