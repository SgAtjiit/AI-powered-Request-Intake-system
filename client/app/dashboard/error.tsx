'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-shell">
      <div className="card-surface space-y-5 px-6 py-12 text-center">
        <p className="eyebrow mx-auto">Something went wrong</p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-950">
            We couldn&apos;t load the dashboard.
          </h1>
          <p className="text-sm leading-7 text-slate-600">
            The request list is temporarily unavailable. Try again, or submit a new request while the dashboard recovers.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Retry
          </button>
          <Link
            href="/submit"
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Submit your first request
          </Link>
        </div>
      </div>
    </main>
  );
}
