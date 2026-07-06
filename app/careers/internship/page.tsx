import Link from "next/link";
import Heading from "@/components/ui-reusables/Heading";
import InternshipApplicationForm from "@/components/pages/careers/InternshipApplicationForm";

export const metadata = {
  title: "Internship Opportunity | Careers",
  description: "Apply for the remote internship opportunity with Yuvaraj.",
};

const workItems = [
  "Write new technical blogs and enhance existing technical blogs.",
  "Read selected software topics and turn the learning into simple blog drafts.",
  "Improve and maintain the website with small content and UI updates.",
  "Spend around 20 minutes on going-on checks: what changed, what is pending, and where support is needed.",
  "Apply for abroad jobs and regular jobs based on the planned job-search checklist.",
  "Support Instagram ads management and content ideas for software development after the first 2 months.",
  "Support software personal branding work while learning how content, consistency, and delivery connect.",
];

const schedule = [
  { day: "Tuesday to Friday", time: "7:30 PM to 10:30 PM", note: "3 hours per day" },
  { day: "Saturday", time: "6:00 PM to 10:00 PM", note: "Weekly progress meetup plus focused work block" },
  { day: "Monday", time: "Holiday", note: "No work" },
  { day: "Sunday", time: "Holiday", note: "No work" },
];

export default function InternshipPage() {
  return (
    <div className="pb-24">
      <div className="mb-6">
        <Link href="/careers" className="text-sm font-medium text-blue-700 hover:underline">
          Back to careers
        </Link>
      </div>

      <Heading icon="/" text="Internship Opportunity" line variant="gradient" />

      <section className="grid gap-8 py-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Role overview</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Remote software content and website internship</h1>
            <p className="mt-4 leading-7 text-slate-600">
              This internship is for someone who wants a learning-focused role around technical blogging, website
              improvement, job application support, and early-stage software personal branding. You will work from home,
              keep a steady evening schedule, and meet once every Saturday to review where we are and how we have progressed.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Work schedule</h2>
            <div className="mt-5 grid gap-3">
              {schedule.map((item) => (
                <div key={item.day} className="rounded-md border border-slate-100 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">{item.day}</p>
                    <p className="text-sm font-medium text-blue-700">{item.time}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Note: Saturday meetup is mainly to understand progress, blockers, and next steps.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Stipend and duration</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Current budget is Rs. 5,000 per month. After a 3-month probation, the stipend can increase to Rs. 7,500
              based on consistency, ownership, and quality of work. The current role is planned up to 6 months.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Day-to-day work</h2>
            <ul className="mt-5 space-y-3 text-slate-600">
              {workItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">What you will learn</h2>
            <p className="mt-4 leading-7 text-slate-700">
              You will learn how technical content is planned, improved, published, and connected with a real developer
              website. You will also get exposure to software job-search workflows, content planning, and personal brand
              experiments for software development.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8" id="apply">
        <Heading icon="#" text="Fill up your details" line variant="gradient" />
        <InternshipApplicationForm />
      </section>
    </div>
  );
}
