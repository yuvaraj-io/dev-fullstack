"use client";

import Heading from "@/components/ui-reusables/Heading";
import Download from "@/components/ui-reusables/Download";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function AboutMe() {
  return (
    <main className="pt-24 pb-32 text-slate-200">

      {/* Intro */}
      <p className="leading-tight font-light text-lg md:text-xl">
        Hey, I’m <span className="text-purple-400">Yuvaraj</span>, a Fullstack
        (MERN/MEAN) Developer and Frontend Specialist based in India. I studied
        Pre-University and earned a B.Com degree from Christ University. With{" "}
        <span className="text-purple-400">7+ years</span> of experience —
        <span className="text-purple-400"> 5+ years</span> in product-based
        companies and <span className="text-purple-400">2</span> years in
        service-based companies — I’ve gained strong expertise in building,
        scaling, and maintaining modern web applications.
      </p>

      <p className="mt-6 leading-tight font-light text-lg md:text-xl">
        I’m now looking for a{" "}
        <span className="text-purple-400">Fullstack Developer</span> role where I
        can mentor teams, manage deployments, handle CI/CD pipelines, oversee
        code merges, and proactively identify and resolve application issues.
      </p>

      <div className="mt-8">
        <Download />
      </div>

      {/* What I Can Offer */}
      <section className="mt-16">
        <Heading icon="-" text="What I Can Offer" />

        {/* Fullstack */}
        <p className="mt-6 text-lg text-yellow-400">
          Fullstack (Node.js, Express, MongoDB, SQL)
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-2 text-lg text-slate-300">
          <li>Building backend APIs using Node.js and Express</li>
          <li>Authentication, middleware, validation, and database modeling</li>
          <li>Developing REST APIs for Angular / React / Vue apps</li>
          <li>Working with SQL and NoSQL databases</li>
          <li>Seamless frontend–backend integration</li>
        </ul>

        {/* React */}
        <p className="mt-6 text-lg text-blue-400">
          React (5+ Years Expertise)
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-2 text-lg text-slate-300">
          <li>Building complete production-ready React applications</li>
          <li>Modern hooks-based architecture</li>
          <li>Greenfield app development from scratch</li>
        </ul>

        {/* Angular */}
        <p className="mt-6 text-lg text-red-400">
          Angular (5+ Years Expertise)
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-2 text-lg text-slate-300">
          <li>AngularJS → Angular migration</li>
          <li>Angular version upgrades</li>
          <li>Components, services, signals, standalone APIs</li>
          <li>Enterprise-scale Angular applications</li>
        </ul>

        {/* Vue */}
        <p className="mt-6 text-lg text-green-400">
          Vue (5+ Years Expertise)
        </p>
        <ul className="mt-3 ml-6 list-disc space-y-2 text-lg text-slate-300">
          <li>Vue 2 & Vue 3 migration projects</li>
          <li>New Vue app development</li>
          <li>Maintainable, scalable Vue architecture</li>
        </ul>
      </section>

      {/* Workflow */}
      <section className="mt-20">
        <Heading icon="-" text="My Workflow" />

        <ul className="mt-6 ml-6 space-y-3 text-lg text-slate-300">
          <li>Understanding application architecture before changes</li>
          <li>Improving UX with loaders, skeletons, validation</li>
          <li>Code refactoring & optimization</li>
          <li>Testing, debugging, and reliability</li>
          <li>Clear communication with stakeholders</li>
          <li>Scalable, maintainable long-term solutions</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-20">
        <Heading icon="#" text="Connect Me" line />

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Phone */}
          <div className="border border-slate-400 p-6">
            <p className="text-lg mb-2">Contact me here</p>
            <a
              href="tel:+917204447908"
              className="text-slate-400 hover:text-white"
            >
              +91 72044 47908
            </a>
          </div>

          {/* Message */}
          <div className="border border-slate-400 p-6 space-y-3">
            <p className="text-lg">Message me here</p>

            <a
              href="https://wa.me/917204447908"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-400 hover:text-green-500"
            >
              <FaWhatsapp className="text-green-500 text-2xl" />
              WhatsApp
            </a>

            <a
              href="mailto:developer@yuvidev.in"
              className="flex items-center gap-3 text-slate-400 hover:text-blue-500"
            >
              <MdEmail className="text-blue-500 text-2xl" />
              developer@yuvidev.in
            </a>

            <a
              href="mailto:yuvarajthecoder@gmail.com"
              className="flex items-center gap-3 text-slate-400 hover:text-red-500"
            >
              <MdEmail className="text-red-500 text-2xl" />
              yuvarajthecoder@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="mt-16">
        <Link
          href="/"
          className="text-purple-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
