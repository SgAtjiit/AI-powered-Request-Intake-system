import Link from 'next/link';
import { RequestForm } from '@/components/request-form';

export default function SubmitPage() {
  return (
    <main className="page-shell">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="eyebrow">Request intake</p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Capture requests fast. Let AI triage the rest.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              Submit a support request, save it instantly, and let the backend enrich it with category, urgency, and a concise summary in the background.
            </p>
          </div>
          <div className="card-surface space-y-4 p-6">
            <h2 className="text-lg font-semibold text-slate-950">
              What happens after submission?
            </h2>
            <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <p>1. Your request is saved to MongoDB immediately.</p>
              <p>2. AI enrichment runs asynchronously through OpenRouter.</p>
              <p>3. The dashboard updates with triage metadata once ready.</p>
            </div>
          </div>
        </div>

        <div className="card-surface p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                New request
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Submit a request
              </h2>
            </div>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-sky-700 transition hover:text-sky-900"
            >
              View dashboard
            </Link>
          </div>
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
