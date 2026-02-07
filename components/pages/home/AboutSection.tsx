import Image from "next/image";
import Heading from "@/components/ui-reusables/Heading";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-12">
      <Heading icon="#" text="About me" line variant="gradient" />

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        {/* Text */}
        <div className="w-full space-y-6 text-slate-400">
          <p className="text-lg leading-relaxed">
            I’m a full-stack{" "}
            <span className="text-purple-400">(MERN / MEAN)</span> and
            frontend-focused engineer who builds web applications that align
            tightly with product and business goals. I combine strong UI/UX
            thinking with solid backend engineering to deliver solutions that
            are functional, scalable, and easy to maintain.
          </p>

          <p className="text-lg leading-relaxed">
            On the frontend, I specialize in creating intuitive user experiences
            using Angular, Vue.js, and React. On the backend, I work with
            Node.js, Express, MongoDB, and SQL to build reliable APIs and
            application architecture.
          </p>

          <p className="text-lg leading-relaxed">
            Beyond development, I focus on performance, quality assurance, and
            smooth CI/CD deployments. Whether improving existing features or
            delivering new applications end-to-end, I ensure the product is
            fast, stable, and ready for long-term growth.
          </p>

          <Link
            href="/about"
            className="inline-block text-lg text-purple-400 hover:underline"
          >
            Click here to learn more about me and my workflow →
          </Link>
        </div>

        {/* Image */}
        <div className="w-full">
          <Image
            src="/assets/profile/yuvaraj.png"
            alt="Yuvaraj"
            width={500}
            height={500}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
