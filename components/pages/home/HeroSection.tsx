import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-12 flex gap-10 justify-between max-md:flex-col-reverse">
      {/* Left Content */}
      <div className="flex flex-col justify-center w-full">
        <h1 className="pb-6 text-4xl text-slate-950 max-md:text-3xl">
          Hi, I'm{" "}
          <span className="text-blue-700">
            Yuvaraj
          </span>{" "}
          – Full Stack Developer with Node.js & UI Specialist
        </h1>

        <p className="pb-8 text-lg font-light leading-tight text-slate-600">
          I’m a{" "}
          <span className="font-normal text-teal-700">
            Full Stack Developer with 7+ years
          </span>{" "}
          of experience delivering scalable web applications using{" "}
          <span className="text-red-600">Angular</span>,{" "}
          <span className="text-blue-700">React</span>,{" "}
          <span className="text-green-700">Vue</span> and Node.js.
        </p>

        <div className="flex gap-4">
          <Link href="/connect">
            <button className="rounded-md border border-blue-200 bg-blue-600 px-6 py-2 text-lg text-white shadow-sm transition hover:bg-blue-700">
              Connect me!!
            </button>
          </Link>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full flex justify-center">
        <Image
          src="/assets/profile/yuvaraj.png"
          alt="Yuvaraj"
          width={500}
          height={500}
          className="w-full max-w-md h-auto"
          priority
        />
      </div>
    </section>
  );
}
