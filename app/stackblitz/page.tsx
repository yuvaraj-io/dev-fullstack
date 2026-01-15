"use client";

import Heading from "@/components/ui-reusables/Heading";
import StackblitzCard from "@/components/ui-reusables/StackblitzCard";
import { stackblitz } from "@/constants/commons/constants";
import { FaAngular, FaReact, FaVuejs, FaJs } from "react-icons/fa";


const RxJSIcon = () => {
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
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


export default function Stackblitz() {
  const openCollections = () => {
    window.open("https://stackblitz.com/@yuvaraj.io/collections", "_blank");
  };

  return (
    <main className="mx-auto max-w-7xl px-6 pt-24 pb-32">
      <Heading
        icon="/"
        text="Stackblitz Code Collections"
        onClick={openCollections}
      />

      {/* JavaScript */}
      <section className="pt-10">
        <Heading
          icon={<FaJs className="text-yellow-400" />}
          text=""
          line
          arrowText="All collections"
          onClick={openCollections}
        />

        <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
          {stackblitz.js.map((item, i) => (
            <StackblitzCard
              key={i}
              props={item}
              icon={<FaJs className="text-yellow-400" />}
              color="yellow-400"
            />
          ))}
        </div>
      </section>

      {/* Angular */}
      <section className="pt-10">
        <Heading
          icon={<FaAngular className="text-red-400" />}
          text=""
          line
          arrowText="All collections"
          onClick={openCollections}
        />

        <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
          {stackblitz.angular.map((item, i) => (
            <StackblitzCard
              key={i}
              props={item}
              icon={<FaAngular className="text-red-400" />}
              color="red-400"
            />
          ))}
        </div>
      </section>

      {/* RxJS */}
      <section className="pt-10">
        <Heading
          icon={<RxJSIcon  />}
          text=""
          line
          arrowText="All collections"
          onClick={openCollections}
        />

        <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
          {stackblitz.rxjs.map((item, i) => (
            <StackblitzCard
              key={i}
              props={item}
              icon={<RxJSIcon />}
              color="pink-400"
            />
          ))}
        </div>
      </section>

      {/* React */}
      <section className="pt-10">
        <Heading
          icon={<FaReact className="text-blue-400" />}
          text=""
          line
          arrowText="All collections"
          onClick={openCollections}
        />

        <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
          {stackblitz.react.map((item, i) => (
            <StackblitzCard
              key={i}
              props={item}
              icon={<FaReact className="text-blue-400" />}
              color="blue-400"
            />
          ))}
        </div>
      </section>

      {/* Vue */}
      <section className="pt-10">
        <Heading
          icon={<FaVuejs className="text-green-400" />}
          text=""
          line
          arrowText="All collections"
          onClick={openCollections}
        />

        <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
          {stackblitz.vue.map((item, i) => (
            <StackblitzCard
              key={i}
              props={item}
              icon={<FaVuejs className="text-green-400" />}
              color="green-400"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
