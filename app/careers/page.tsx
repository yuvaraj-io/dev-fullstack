import Link from "next/link";
import Heading from "@/components/ui-reusables/Heading";

export const metadata = {
  title: "Careers | Yuvaraj",
  description: "Remote internship opportunities for software content, website improvement, and personal branding support.",
};

export default function CareersPage() {
  return (
    <div className="pb-24">
      <Heading icon="/" text="Careers" line variant="gradient" />

      <section className="grid gap-8 py-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-lg leading-8 text-slate-600 md:text-xl">
            I am opening a small remote internship for someone who wants to learn by helping with technical writing,
            website improvements, job research, and software personal branding work. The role is practical, calm, and
            focused on building consistency over time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/careers/internship"
              className="rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
              Internship opportunity
            </Link>
            {/* <Link
              href="/careers/applications"
              className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Received applications
            </Link> */}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Current opening</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Internship Opportunity</h1>
          <p className="mt-4 text-slate-600">
            Work from home, evening schedule, weekly progress meetup, and a monthly stipend starting at Rs. 5,000.
          </p>
          <dl className="mt-6 grid gap-4 text-sm text-slate-600">
            <div>
              <dt className="font-semibold text-slate-900">Mode</dt>
              <dd>Completely remote</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Probation</dt>
              <dd>3 months, with the current role planned up to 6 months</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Stipend</dt>
              <dd>Rs. 5,000 now, increasing to Rs. 7,500 after 3 months based on fit and progress</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
