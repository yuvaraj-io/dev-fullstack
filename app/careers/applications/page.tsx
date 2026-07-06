import Link from "next/link";
import Heading from "@/components/ui-reusables/Heading";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

type CareerApplication = {
  id?: number;
  role?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  portfolio?: string;
  availability?: string;
  motivation?: string;
  status?: string;
  createdAt?: Date;
  resume?: {
    originalName?: string;
    url?: string;
    size?: number;
  };
};

async function getApplications(): Promise<CareerApplication[]> {
  const db = await getDb();
  const applications = await db
    .collection<CareerApplication>("career_applications")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return applications;
}

export default async function CareerApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="pb-24">
      <div className="mb-6">
        <Link href="/careers/internship" className="text-sm font-medium text-blue-700 hover:underline">
          Back to internship
        </Link>
      </div>

      <Heading icon="/" text="Received Applications" line variant="gradient" />

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-slate-600">
          {applications.length === 0
            ? "No internship applications have been received yet."
            : `${applications.length} candidate application${applications.length === 1 ? "" : "s"} received.`}
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        {applications.map((application) => (
          <article key={application.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-blue-700">{application.role || "Internship Opportunity"}</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">{application.name}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Applied {application.createdAt ? new Date(application.createdAt).toLocaleString("en-IN") : "recently"}
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                {application.status || "new"}
              </span>
            </div>

            <div className="mt-5 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
              <Info label="Email" value={application.email} href={application.email ? `mailto:${application.email}` : undefined} />
              <Info label="Phone" value={application.phone} href={application.phone ? `tel:${application.phone}` : undefined} />
              <Info label="Location" value={application.location} />
              <Info label="Availability" value={application.availability} />
              <Info label="Portfolio" value={application.portfolio} href={application.portfolio} />
              <Info label="Resume" value={application.resume?.originalName} href={application.resume?.url} />
            </div>

            {application.motivation ? (
              <div className="mt-5 rounded-md bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Motivation</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{application.motivation}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value, href }: { label: string; value?: string; href?: string }) {
  if (!value) {
    return (
      <div>
        <p className="font-semibold text-slate-900">{label}</p>
        <p className="mt-1 text-slate-500">Not provided</p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-semibold text-slate-900">{label}</p>
      {href ? (
        <a href={href} target={href.startsWith("http") || href.startsWith("/") ? "_blank" : undefined} className="mt-1 block break-words text-blue-700 hover:underline">
          {value}
        </a>
      ) : (
        <p className="mt-1 break-words">{value}</p>
      )}
    </div>
  );
}
