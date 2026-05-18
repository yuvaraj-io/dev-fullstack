import Image from "next/image";
import Heading from "@/components/ui-reusables/Heading";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-16">
      <Heading icon="#" text="About me" line variant="gradient" />

      <div className="mt-6 flex flex-col gap-10 md:flex-row md:items-center">
        <div className="w-full space-y-5 text-slate-600">
          <p className="text-base leading-relaxed">
            I&apos;m a full-stack{" "}
            <span className="font-semibold text-violet-600">(MERN / MEAN)</span> and
            frontend-focused engineer who builds web applications that align tightly
            with product and business goals. I combine strong UI/UX thinking with
            solid backend engineering to deliver solutions that are functional,
            scalable, and easy to maintain.
          </p>

          <p className="text-base leading-relaxed">
            On the frontend I specialise in{" "}
            <span className="font-semibold text-[#38bdf8]">Angular</span>,{" "}
            <span className="font-semibold text-[#4ade80]">Vue.js</span> and{" "}
            <span className="font-semibold text-[#38bdf8]">React</span>. On the
            backend I work with Node.js, Express, MongoDB and SQL to build reliable
            APIs and application architecture.
          </p>

          <p className="text-base leading-relaxed">
            Beyond development I focus on performance, quality assurance and smooth
            CI/CD deployments — whether improving existing features or delivering
            new applications end-to-end.
          </p>

          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:underline"
          >
            Learn more about my workflow →
          </Link>
        </div>

        <div className="w-full flex-shrink-0 md:max-w-xs">
          <div className="overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Image
              src="/assets/profile/yuvaraj.png"
              alt="Yuvaraj"
              width={400}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
