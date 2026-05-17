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

export default function Card({
  heading,
  img,
  skills = [],
  mainHeading,
  subtitle,
  link,
}: CardProps) {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm">

      {/* Top Heading */}
      {heading && (
        <h4 className="border-b border-slate-200 px-4 py-3 text-lg font-medium text-slate-950">
          {heading}
        </h4>
      )}

      {/* Image */}
      {img && (
        <div className="border-b border-slate-200 p-2">
          <div className="relative w-full pb-[56.25%]">
            <Image
              src={img}
              alt="card"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
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
      <div className="flex flex-1 flex-col gap-2 p-4">
        {mainHeading && (
          <h4 className="text-2xl font-semibold text-slate-950">
            {mainHeading}
          </h4>
        )}

        {subtitle && (
          <p className="min-h-[72px] max-h-[72px] overflow-hidden text-base leading-relaxed text-slate-600">
            {subtitle}
          </p>
        )}

        {link && (
          <button
            onClick={() => router.push(link)}
            className="mt-auto w-fit rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-base text-blue-700 transition hover:bg-blue-600 hover:text-white"
          >
            Live
          </button>
        )}
      </div>
    </div>
  );
}
  
