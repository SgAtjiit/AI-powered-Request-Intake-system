import { CategoryFilter } from '@/lib/constants';

const filterLabels: Record<CategoryFilter, string> = {
  all: 'All requests',
  billing: 'Billing requests',
  support: 'Support requests',
  feedback: 'Feedback requests',
  general: 'General requests',
};

interface DashboardSummaryProps {
  total: number;
  category: CategoryFilter;
}

export function DashboardSummary({
  total,
  category,
}: DashboardSummaryProps) {
  return (
    <div className="card-surface flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-950">{filterLabels[category]}</p>
        <p className="text-sm text-slate-500">
          Server-filtered results based on the current URL search params.
        </p>
      </div>
      <div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
        {total} total
      </div>
    </div>
  );
}
