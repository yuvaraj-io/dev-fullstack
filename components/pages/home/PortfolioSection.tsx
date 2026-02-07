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
          variant="gradient"
        />
      </Link>

      {/* Cards */}
      <div className="grid gap-5 py-2r sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card {...featured.tred} />
        <Card {...featured.pitchpro} />
        <Card {...featured.yuvidev} />
      </div>

    </section>
  );
}
