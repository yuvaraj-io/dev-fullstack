import AboutSection from "@/components/pages/home/AboutSection";
import ContactSection from "@/components/pages/home/ConnectMeSection";
import HeroSection from "@/components/pages/home/HeroSection";
import PortfolioSection from "@/components/pages/home/PortfolioSection";
import SkillCard from "@/components/pages/home/Skills";
import Card from "@/components/ui-reusables/Card";
import Heading from "@/components/ui-reusables/Heading";
import { skills } from "@/constants/commons/constants";
// import { skills } from "@/constants/commons/constants";

import Image from "next/image";

export default function Home() {
  return (
    <>
    <HeroSection />
    <PortfolioSection />
    {/* <SkillCard skills={skills}/> */}
    <div className="pt-2r">
      <Heading icon="-" text="Skills" line={false} variant="gradient" />
        <div className="pt-2r flex gap-5 justify-between">
            {/* <div className="w-full flex-grow-0">
              <img className="pt-4 h-96" alt="skill" src="/assets/skill.png" />
            </div> */}
            <div className="w-full flex-grow">
                <div className="flex gap-2 flex-wrap gap-3">
                  <Card  {...skills.language}/>
                  <Card  {...skills.framework}/>
                  <Card {...skills.database}/>
                  <Card {...skills.npm}/>
                  <Card {...skills.tools}/>
                </div>
                <div className="flex gap-2 pt-2">
                  {/* <Card props={skills.database}/>
                  <Card props={skills.npm}/> */}
                </div>
                <div className="flex gap-2 pt-2">
                  {/* <Card props={skills.tools}/> */}
                </div>
            </div>
        </div>
    </div>

    <AboutSection />
    <ContactSection />

    </>
  );
}
