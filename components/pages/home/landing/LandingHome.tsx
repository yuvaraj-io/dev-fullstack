import HeroLanding from "./HeroLanding";
import FeaturedProjectsSection from "../FeaturedProjectsSection";
import SkillsArchitecture from "./SkillsArchitecture";
import JourneyTimeline from "./JourneyTimeline";
import ConnectSimple from "./ConnectSimple";

export default function LandingHome() {
  return (
    <div className="-mt-24">
      <HeroLanding />
      <FeaturedProjectsSection />
      <SkillsArchitecture />
      <JourneyTimeline />
      <ConnectSimple />
    </div>
  );
}
