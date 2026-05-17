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
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm">

      {/* Top Heading */}
      {heading && (
        <h4 className="border-b border-slate-200 px-4 py-3 text-lg font-medium text-slate-950">
          {heading}
        </h4>
      )}

      {/* Image */}
      {img && (
        <div className="border-b border-slate-200 p-2">
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
        <div className="flex flex-wrap gap-2 border-b border-slate-200 px-4 py-3 text-sm">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded bg-slate-100 px-2 py-1 text-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        {mainHeading && (
          <h4 className="text-2xl font-semibold text-slate-950">
            {mainHeading}
          </h4>
        )}

        {subtitle && (
          <p className="text-base leading-relaxed text-slate-600">
            {subtitle}
          </p>
        )}

        {link && (
          <button
            onClick={() => router.push(link)}
            className="mt-2 w-fit rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-base text-blue-700 transition hover:bg-blue-600 hover:text-white"
          >
            Live
          </button>
        )}
      </div>
    </div>
  );
}
