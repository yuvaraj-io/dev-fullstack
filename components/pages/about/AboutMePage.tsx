"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const timeline = [
  {
    title: "Frontend Development",
    description: "Building interfaces and user experiences.",
  },
  {
    title: "Backend Development",
    description: "APIs, databases, authentication and business logic.",
  },
  {
    title: "Deployment",
    description: "VPS, Nginx, CI/CD, production environments.",
  },
  {
    title: "Docker",
    description: "Packaging applications consistently.",
  },
  {
    title: "Microservices",
    description: "Understanding distributed systems.",
  },
  {
    title: "Kubernetes",
    description: "Learning orchestration, scaling and reliability.",
  },
  {
    title: "Cloud",
    description: "Building systems that are ready for production.",
  },
  {
    title: "System Design",
    description: "Understanding how software behaves at scale.",
  },
];

const mindsetCards = [
  {
    title: "Build before Theory",
    description:
      "I prefer learning through building. Every project teaches me something no tutorial can.",
  },
  {
    title: "Systems Thinking",
    description:
      "I no longer see frontend and backend separately. I enjoy understanding how the entire software system works.",
  },
  {
    title: "Consistency",
    description: "Small improvements every day eventually become expertise.",
  },
  {
    title: "Curiosity",
    description:
      "Curiosity has been my biggest teacher. Whenever I hit a limitation, I learn the next skill required to overcome it.",
  },
];

const principles = [
  "Learn with purpose.",
  "Protect your attention.",
  "Build before you optimize.",
  "Understand before you memorize.",
  "Consistency beats intensity.",
  "Stay curious.",
  "Solve problems, not just tickets.",
];

const philosophySteps = [
  "Learn the fundamentals.",
  "Build real-world projects.",
  "Deploy them.",
  "Understand how they behave in production.",
  "Repeat.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutMePage() {
  return (
    <div className="relative left-1/2 -mt-24 w-screen -translate-x-1/2 overflow-hidden bg-[#05060a] text-white">
      <HeroSection />

      <main className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <LearningPhilosophy />
        <JourneyTimeline />
        <EngineeringMindset />
        <PrinciplesSection />
        <QuoteSection />
      </main>
    </div>
  );
}

function HeroSection() {
  const growthLabels = [
    { label: "Fundamentals", className: "left-[8%] top-[31%]" },
    { label: "Build", className: "right-[9%] top-[24%]" },
    { label: "Deploy", className: "right-[3%] top-[58%]" },
    { label: "Observe", className: "bottom-[13%] left-[14%]" },
    { label: "Improve", className: "bottom-[20%] right-[21%]" },
  ];

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-28">
      <GrowthBackground />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge>About the engineer</Badge>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Learning with Purpose.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl md:text-2xl md:leading-9">
            I don&apos;t learn to impress. I learn to build systems that solve real problems.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[440px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          {/* Animated Background Ring Aura */}
          <div className="absolute inset-2 rounded-full bg-[conic-gradient(from_180deg,rgba(124,58,237,0),rgba(124,58,237,0.7),rgba(20,184,166,0.6),rgba(255,255,255,0.1),rgba(124,58,237,0))] opacity-80 blur-md motion-safe:animate-[spin_20s_linear_infinite]" />
          
          {/* Outer Glass Card */}
          <div className="absolute inset-4 rounded-full border border-white/15 bg-white/[0.03] shadow-[0_20px_60px_rgba(124,58,237,0.25)] backdrop-blur-xl" />

          {/* Profile Photo Container */}
          <div className="absolute inset-10 overflow-hidden rounded-full border-2 border-white/25 bg-[#0a0c16] shadow-2xl sm:inset-8">
            <Image
              src="/assets/profile/yuvaraj.png"
              alt="Yuvaraj - Full Stack Engineer"
              fill
              priority
              sizes="(min-width: 768px) 360px, 80vw"
              className="object-cover object-[center_18%] transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060a]/60 via-transparent to-transparent" />
          </div>

          {/* Orbiting Growth Badges */}
          {growthLabels.map((item, index) => (
            <motion.div
              key={item.label}
              className={cn(
                "absolute z-20 rounded-full border border-white/15 bg-slate-900/80 px-3.5 py-1 text-[11px] font-bold text-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md sm:text-xs",
                item.className
              )}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, -7, 0] }}
              transition={{
                opacity: { duration: 0.35, delay: 0.35 + index * 0.08 },
                y: { duration: 3.4 + index * 0.3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GrowthBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(180deg,#05060a_0%,#090b12_52%,#05060a_100%)]" />
      <motion.div
        className="absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.42, 0.7, 0.42] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
    </div>
  );
}

function LearningPhilosophy() {
  return (
    <SectionShell eyebrow="Section 01" title="Yuvaraj's Learning Style" className="pt-8">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <RevealCard className="p-7 md:p-9">
          <p className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            I believe learning should have purpose.
          </p>
          <div className="mt-8 space-y-5 text-base leading-8 text-slate-300 md:text-lg">
            <p>
              I don&apos;t chase every technology, every trend, or every debate. Instead, I invest my energy in
              understanding what helps me build better software.
            </p>
            <p>
              I don&apos;t measure progress by how much I can explain. I measure it by what I can design, build,
              deploy, and improve.
            </p>
            <p>
              For me, engineering isn&apos;t about memorizing every answer. It&apos;s about having the confidence to
              find the answer when it matters.
            </p>
          </div>
        </RevealCard>

        <RevealCard className="overflow-hidden">
          <div className="border-b border-white/10 p-7 md:p-9">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">My approach is simple</p>
          </div>
          <div className="divide-y divide-white/10">
            {philosophySteps.map((step, index) => (
              <motion.div
                key={step}
                className="flex items-center gap-5 p-5 md:p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm text-blue-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-slate-100">{step}</span>
              </motion.div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-500/12 via-white/[0.03] to-teal-500/12 p-7 text-lg leading-8 text-slate-200 md:p-9">
            What matters most isn&apos;t speed. It&apos;s maintaining a pace of learning that compounds over time.
          </div>
        </RevealCard>
      </div>
    </SectionShell>
  );
}

function JourneyTimeline() {
  return (
    <SectionShell eyebrow="Section 02" title="My Journey">
      <div className="relative">
        <div aria-hidden="true" className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-blue-400/0 via-blue-300/40 to-teal-300/0 md:block" />
        <div className="grid gap-4">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="group relative md:pl-12"
            >
              <span className="absolute left-[11px] top-8 hidden h-3 w-3 rounded-full bg-blue-300 shadow-[0_0_24px_rgba(96,165,250,0.8)] md:block" />
              <Card className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:bg-white/[0.07]">
                <div className="grid gap-4 p-6 md:grid-cols-[0.28fr_1fr] md:items-center md:p-7">
                  <p className="text-sm font-medium text-slate-500">Milestone {String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                    <p className="mt-2 text-base leading-7 text-slate-300">{item.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function EngineeringMindset() {
  return (
    <SectionShell eyebrow="Section 03" title="Engineering Mindset">
      <div className="grid gap-4 md:grid-cols-2">
        {mindsetCards.map((card, index) => (
          <RevealCard key={card.title} delay={index * 0.07} className="group transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
            <CardHeader>
              <div className="mb-4 h-10 w-10 rounded-xl border border-white/10 bg-gradient-to-br from-blue-400/20 to-teal-300/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-7 text-slate-300">{card.description}</p>
            </CardContent>
          </RevealCard>
        ))}
      </div>
    </SectionShell>
  );
}

function PrinciplesSection() {
  return (
    <SectionShell eyebrow="Section 04" title="Principles">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, index) => (
          <motion.div
            key={principle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.48, delay: index * 0.04 }}
            className={cn(
              "rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-lg font-medium text-slate-100 shadow-[0_16px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:border-blue-300/30 hover:bg-white/[0.075]",
              index === principles.length - 1 && "sm:col-span-2 lg:col-span-1"
            )}
          >
            {principle}
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function QuoteSection() {
  return (
    <section className="py-20 md:py-28">
      <motion.figure
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.085] via-white/[0.045] to-blue-500/10 px-6 py-14 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:px-14 md:py-20"
      >
        <div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />
        <blockquote className="mx-auto max-w-4xl whitespace-pre-line text-3xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-5xl md:leading-tight">
          {`"I don't invest my energy in proving what I know.
I invest it in learning what I don't.

Every skill compounds.

Every project teaches.

Every challenge becomes experience."`}
        </blockquote>
        <figcaption className="mt-8 text-sm font-medium uppercase tracking-[0.28em] text-slate-400">
          Yuvaraj
        </figcaption>
      </motion.figure>
    </section>
  );
}

function SectionShell({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-10 md:mb-14"
      >
        <Badge>{eyebrow}</Badge>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function RevealCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  );
}
