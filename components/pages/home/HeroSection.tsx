import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-12 flex gap-10 justify-between max-md:flex-col-reverse">
      {/* Left Content */}
      <div className="flex flex-col justify-center w-full">
        <h1 className="pb-6 text-4xl max-md:text-3xl">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
            Yuvaraj
          </span>{" "}
          – Full Stack Developer with Node.js & UI Specialist
        </h1>

        <p className="pb-8 text-lg font-extralight leading-tight">
          I’m a{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-sky-300 bg-clip-text text-transparent font-normal">
            Full Stack Developer with 7+ years
          </span>{" "}
          of experience delivering scalable web applications using{" "}
          <span className="text-red-400">Angular</span>,{" "}
          <span className="text-blue-400">React</span>,{" "}
          <span className="text-green-400">Vue</span> and Node.js.
        </p>

        <div className="flex gap-4">
          <Link href="/connect">
            <button className="border border-purple-500 px-6 py-2 text-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-sky-500 hover:text-white transition">
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
