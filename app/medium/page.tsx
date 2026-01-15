"use client";

import Link from "next/link";
import Heading from "@/components/ui-reusables/Heading";
import MediumCard from "@/components/ui-reusables/MediumCard";
import { medium } from "@/constants/commons/constants";

import { FaAngular, FaJs } from "react-icons/fa";


const RxJSIcon = () => {
  return (
    <div className="relative flex items-center justify-center w-16 h-16 text-pink-400">
      <img 
        src="https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png"
        alt="RxJS Logo"
        className="w-full h-full object-contain"
      />
      {/* Color Overlay */}
      <div className="absolute inset-0 mix-blend-multiply opacity-50" />
    </div>
  );
};


export default function Medium() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-24 pb-32">

      <Heading icon="/" text="Medium" />

      {/* Javascript */}
      <section className="pt-8">
        <Heading
          icon={<FaJs className="text-yellow-400" />}
          text="Javascript"
          line
          arrowText="View all"
          onClick={() =>
            window.open(
              "https://medium.com/@yuvaraj.io/list/javascript-by-yuvaraj-1fc7ba9201f2",
              "_blank"
            )
          }
        />

        <div className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {medium.javascript.map((m, i) => (
            <MediumCard key={i} {...m} border="yellow" />
          ))}
        </div>
      </section>

      {/* Angular */}
      <section className="pt-12">
        <Heading
          icon={<FaAngular className="text-red-500" />}
          text="Angular"
          line
          arrowText="View all"
          onClick={() =>
            window.open(
              "https://medium.com/@yuvayuvaraj720444/angular-intermediate-lessons-acbea2dfc9b",
              "_blank"
            )
          }
        />

        <div className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {medium.angular.map((m, i) => (
            <MediumCard key={i} {...m} border="red" />
          ))}
        </div>
      </section>

      {/* RxJS */}
      <section className="pt-12">
        <Heading
          icon={<RxJSIcon />}
          text="RxJS Operators"
          line
          arrowText="View all"
          onClick={() =>
            window.open(
              "https://medium.com/@yuvidev/rxjs-operators-section-c965d3690dd4",
              "_blank"
            )
          }
        />

        <div className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-4">
          {medium.rxjs.map((m, i) => (
            <MediumCard key={i} {...m} border="pink" />
          ))}
        </div>
      </section>

    </main>
  );
}
