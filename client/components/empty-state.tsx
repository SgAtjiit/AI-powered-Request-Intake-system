import { CategoryFilter } from '@/lib/constants';
import Link from 'next/link';

const emptyStateCopy: Record<CategoryFilter, string> = {
  all: 'There are no requests in the queue yet.',
  billing: 'No billing requests match the current filter yet.',
  support: 'No support requests match the current filter yet.',
  feedback: 'No feedback requests match the current filter yet.',
  general: 'No general requests match the current filter yet.',
};

export function EmptyState({ category }: { category: CategoryFilter }) {
  return (
    <div className="card-surface flex flex-col items-center gap-4 px-6 py-12 text-center">
      <div className="rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
        No requests yet
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-slate-950">
          Your queue is empty.
        </h3>
        <p className="max-w-xl text-sm leading-7 text-slate-600">
          {emptyStateCopy[category]} Start by submitting a request. New entries appear here immediately, then update once AI enrichment finishes.
        </p>
      </div>
      <Link
        href="/submit"
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Submit your first request
      </Link>
    </div>
  );
}
