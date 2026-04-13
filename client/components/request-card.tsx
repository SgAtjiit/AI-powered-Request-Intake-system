import { RequestRecord } from '@/lib/api';

const categoryStyles: Record<string, string> = {
  billing: 'bg-sky-100 text-sky-700 ring-sky-200',
  support: 'bg-amber-100 text-amber-700 ring-amber-200',
  feedback: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  general: 'bg-slate-200 text-slate-700 ring-slate-300',
};

const urgencyStyles: Record<string, string> = {
  low: 'bg-emerald-500',
  medium: 'bg-orange-400',
  high: 'bg-rose-500',
};

function ProcessingPill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
      <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />
      Processing...
    </span>
  );
}

export function RequestCard({ request }: { request: RequestRecord }) {
  return (
    <article className="card-surface space-y-5 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-950">{request.name}</h3>
          <p className="text-sm text-slate-600">{request.email}</p>
        </div>
        <p className="text-sm text-slate-500">
          {new Intl.DateTimeFormat('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(request.createdAt))}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {request.category ? (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ring-1 ${
              categoryStyles[request.category]
            }`}
          >
            {request.category}
          </span>
        ) : (
          <ProcessingPill />
        )}

        {request.urgency ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            <span className={`h-2.5 w-2.5 rounded-full ${urgencyStyles[request.urgency]}`} />
            {request.urgency}
          </span>
        ) : (
          <ProcessingPill />
        )}
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          AI Summary
        </p>
        {request.summary ? (
          <p className="text-sm leading-7 text-slate-700">{request.summary}</p>
        ) : (
          <div className="space-y-2">
            <div className="shimmer h-4 w-3/4 rounded-full" />
            <div className="shimmer h-4 w-1/2 rounded-full" />
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
        {request.message}
      </div>
    </article>
  );
}
