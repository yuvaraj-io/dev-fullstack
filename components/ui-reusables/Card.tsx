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
    <div className="border border-slate-400">

      {/* Top Heading */}
      {heading && (
        <h4 className="border-b border-slate-400 p-3 text-1.5r text-white">
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
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="border-b border-slate-400 p-4 text-1.5r">
          {skills.map((skill, index) => (
            <span key={index} className="pl-2 text-slate-400">
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {mainHeading && (
          <h4 className="text-3r pb-2">{mainHeading}</h4>
        )}

        {subtitle && (
          <p className="text-slate-400 text-1.5r leading-snug pb-2">
            {subtitle}
          </p>
        )}

        {link && (
          <button
            onClick={() => router.push(link)}
            className="mt-2 border border-purple-500 px-2r py-1r text-1.5r"
          >
            Live
          </button>
        )}
      </div>
    </div>
  );
}
