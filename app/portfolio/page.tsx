import Heading from "@/components/ui-reusables/Heading";
import Card from "@/components/ui-reusables/Card";
import { portfolios, projects } from "@/constants/commons/constants";

export default function Portfolio() {
  return (
    <div className="py-12 pb-28">

      {/* Portfolio */}
      <Heading icon="/" text="Portfolio" line />

      <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {portfolios.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>

      {/* Small Projects */}
      <div className="mt-16">
        <Heading icon="#" text="Small Projects" line />

        <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>

    </div>
  );
}
