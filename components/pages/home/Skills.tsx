"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type CardProps = {
  heading?: string;
  img?: string;
  skills?: string[];
  mainHeading?: string;
  subtitle?: string;
  link?: string;
};

export default function SkillCard({
  heading,
  img,
  skills = [],
  mainHeading,
  subtitle,
  link,
}: CardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col border border-slate-400 bg-transparent">

      {/* Top Heading */}
      {heading && (
        <h4 className="border-b border-slate-400 px-4 py-3 text-lg font-medium text-white">
          {heading}
        </h4>
      )}

      {/* Image */}
      {img && (
        <div className="border-b border-slate-400 p-2">
          <Image
            src={img}
            alt="card"
            width={400}
            height={250}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-slate-400 px-4 py-3 text-sm">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded bg-slate-800 px-2 py-1 text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        {mainHeading && (
          <h4 className="text-2xl font-semibold text-white">
            {mainHeading}
          </h4>
        )}

        {subtitle && (
          <p className="text-base leading-relaxed text-slate-400">
            {subtitle}
          </p>
        )}

        {link && (
          <button
            onClick={() => router.push(link)}
            className="mt-2 w-fit border border-purple-500 px-4 py-2 text-base text-purple-400 transition hover:bg-purple-500 hover:text-white"
          >
            Live
          </button>
        )}
      </div>
    </div>
  );
}
