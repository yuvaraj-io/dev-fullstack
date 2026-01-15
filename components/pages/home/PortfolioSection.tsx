import Link from "next/link";
import Heading from "@/components/ui-reusables/Heading";
import Card from "@/components/ui-reusables/Card";
import { featured } from "@/constants/commons/constants";

export default function PortfolioSection() {
  return (
    <section className="pt-2r">

      {/* Heading */}
      <Link href="/portfolio">
        <Heading
          icon="#"
          text="Portfolio"
          line
          arrowText="View all"
        />
      </Link>

      {/* Cards */}
      <div className="flex gap-5 justify-between py-2r mob:flex-wrap">
        <Card {...featured.tred} />
        <Card {...featured.pitchpro} />
        <Card {...featured.yuvidev} />
      </div>

    </section>
  );
}
