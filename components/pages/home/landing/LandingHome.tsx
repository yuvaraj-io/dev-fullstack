import HeroLanding from "./HeroLanding";
import PortfolioQuiet from "./PortfolioQuiet";
import SkillsArchitecture from "./SkillsArchitecture";
import JourneyTimeline from "./JourneyTimeline";
import ConnectSimple from "./ConnectSimple";

export default function LandingHome() {
  return (
    <div className="-mt-24">
      <HeroLanding />
      <PortfolioQuiet />
      <SkillsArchitecture />
      <JourneyTimeline />
      <ConnectSimple />
    </div>
  );
}
