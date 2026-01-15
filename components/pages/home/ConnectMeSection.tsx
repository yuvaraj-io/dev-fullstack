import Heading from "@/components/ui-reusables/Heading";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactSection() {
  return (
    <section className="py-12">
      <Heading icon="#" text="Connect me" line />

      <div className="mt-8 flex flex-col gap-6 md:flex-row">
        {/* Phone */}
        <div className="w-full max-w-sm border border-slate-400 p-6">
          <p className="mb-3 text-lg text-white">Contact me here</p>
          <a
            href="tel:+917204447908"
            className="text-base text-slate-400 hover:text-white"
          >
            +91 72044 47908
          </a>
        </div>

        {/* Messages */}
        <div className="w-full max-w-sm border border-slate-400 p-6 space-y-4">
          <p className="text-lg text-white">Message me here</p>

          <a
            href="https://wa.me/917204447908"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-slate-400 hover:text-green-500"
          >
            <FaWhatsapp className="text-2xl text-green-500" />
            Connect on WhatsApp
          </a>

          <a
            href="mailto:developer@yuvidev.in"
            className="flex items-center gap-3 text-slate-400 hover:text-blue-500"
          >
            <MdEmail className="text-2xl text-blue-500" />
            developer@yuvidev.in
          </a>

          <a
            href="mailto:yuvarajthecoder@gmail.com"
            className="flex items-center gap-3 text-slate-400 hover:text-red-500"
          >
            <MdEmail className="text-2xl text-red-500" />
            yuvarajthecoder@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
