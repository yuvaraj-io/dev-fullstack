import AboutSection from "@/components/pages/home/AboutSection";
import ContactSection from "@/components/pages/home/ConnectMeSection";
import HeroSection from "@/components/pages/home/HeroSection";
import PortfolioSection from "@/components/pages/home/PortfolioSection";
import Heading from "@/components/ui-reusables/Heading";
import Card from "@/components/ui-reusables/Card";
import { skills } from "@/constants/commons/constants";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Portfolio preview */}
      <div className="py-4">
        <PortfolioSection />
      </div>

      {/* Skills */}
      <div className="-mx-6 bg-slate-50/70 px-6 py-12">
        <Heading icon="-" text="Skills" line={false} variant="gradient" />
        <div className="mt-4 flex flex-wrap gap-4">
          <Card {...skills.language} />
          <Card {...skills.framework} />
          <Card {...skills.database} />
          <Card {...skills.npm} />
          <Card {...skills.tools} />
        </div>
      </div>

      {/* About */}
      <AboutSection />

      {/* Connect */}
      <ContactSection />
    </>
  );
}
