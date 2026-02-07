"use client";

import { Suspense } from "react";
import EditPage from "@/components/pages/edit/EditPage";

export default function Edit() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-200">Loading editor...</div>}>
      <EditPage />
    </Suspense>
  );
}
