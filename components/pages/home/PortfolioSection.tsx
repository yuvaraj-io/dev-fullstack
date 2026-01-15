import Heading from "@/components/ui-reusables/Heading";
import Card from "@/components/ui-reusables/Card";
import { featured } from "@/constants/commons/constants";

type Props = {
  onNavigate: (path: string) => void;
};

export default function PortfolioSection({ onNavigate }: Props) {
  return (
    <section className="pt-2r">
      <Heading
        icon="#"
        text="Portfolio"
        line
        arrowText="View all"
        onClick={() => onNavigate("portfolio")}
      />

      <div className="flex gap-5 justify-between py-2r mob:flex-wrap">
        <Card {...featured.tred} />
        <Card {...featured.pitchpro} />
        <Card {...featured.yuvidev} />
      </div>
    </section>
  );
}
