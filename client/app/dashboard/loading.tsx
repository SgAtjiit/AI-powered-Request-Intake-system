import { RequestSkeletonList } from '@/components/request-skeleton-list';

export default function DashboardLoading() {
  return (
    <main className="page-shell space-y-8">
      <section className="space-y-4">
        <div className="shimmer h-4 w-24 rounded-full" />
        <div className="space-y-3">
          <div className="shimmer h-10 w-80 rounded-full" />
          <div className="shimmer h-4 w-full max-w-2xl rounded-full" />
          <div className="shimmer h-4 w-3/4 max-w-xl rounded-full" />
        </div>
      </section>
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="shimmer h-10 w-24 rounded-full" />
        ))}
      </div>
      <RequestSkeletonList />
    </main>
  );
}
