import Heading from "@/components/ui-reusables/Heading";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ContactSection() {
  return (
    <section className="py-12">
      <Heading icon="#" text="Connect me" line variant="gradient" />

      <div className="mt-8 flex flex-col gap-6 md:flex-row">
        {/* Phone */}
        <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-3 text-lg text-slate-950">Contact me here</p>
          <a
            href="tel:+917204447908"
            className="text-base text-slate-600 hover:text-blue-700"
          >
            +91 72044 47908
          </a>
        </div>

        {/* Messages */}
        <div className="w-full max-w-sm space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-lg text-slate-950">Message me here</p>

          <a
            href="https://wa.me/917204447908"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-slate-600 hover:text-green-600"
          >
            <FaWhatsapp className="text-2xl text-green-500" />
            Connect on WhatsApp
          </a>

          <a
            href="mailto:developer@yuvidev.in"
            className="flex items-center gap-3 text-slate-600 hover:text-blue-700"
          >
            <MdEmail className="text-2xl text-blue-500" />
            developer@yuvidev.in
          </a>

          <a
            href="mailto:yuvarajthecoder@gmail.com"
            className="flex items-center gap-3 text-slate-600 hover:text-red-600"
          >
            <MdEmail className="text-2xl text-red-500" />
            yuvarajthecoder@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
