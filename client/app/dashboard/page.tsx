import { Suspense } from 'react';
import { DashboardFilter } from '@/components/dashboard-filter';
import { DashboardSummary } from '@/components/dashboard-summary';
import { EmptyState } from '@/components/empty-state';
import { RequestCard } from '@/components/request-card';
import { RequestSkeletonList } from '@/components/request-skeleton-list';
import { getRequests } from '@/lib/api';
import {
  CategoryFilter,
  REQUEST_CATEGORIES,
  RequestCategory,
} from '@/lib/constants';

function getSelectedCategory(value?: string): CategoryFilter {
  if (!value) {
    return 'all';
  }

  return REQUEST_CATEGORIES.includes(value as RequestCategory)
    ? (value as RequestCategory)
    : 'all';
}

async function DashboardResults({ category }: { category: CategoryFilter }) {
  const response = await getRequests({
    page: 1,
    limit: 10,
    category: category === 'all' ? undefined : category,
  });

  if (!response.data.length) {
    return <EmptyState category={category} />;
  }

  return (
    <div className="space-y-4">
      <DashboardSummary total={response.total} category={category} />
      {response.data.map((request) => (
        <RequestCard key={request._id} request={request} />
      ))}
    </div>
  );
}

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const selectedCategory = getSelectedCategory(searchParams?.category);

  return (
    <main className="page-shell space-y-8">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <p className="eyebrow">Dashboard</p>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Request triage at a glance.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              Requests are saved instantly and enriched asynchronously. Use the server-driven category filter to inspect the queue without stale client-side filtering.
            </p>
          </div>
        </div>
        <DashboardFilter selectedCategory={selectedCategory} />
      </section>

      <Suspense key={selectedCategory} fallback={<RequestSkeletonList />}>
        <DashboardResults category={selectedCategory} />
      </Suspense>
    </main>
  );
}
