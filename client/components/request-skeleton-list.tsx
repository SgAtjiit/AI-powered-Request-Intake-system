export function RequestSkeletonList() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="card-surface space-y-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="shimmer h-5 w-40 rounded-full" />
              <div className="shimmer h-4 w-52 rounded-full" />
            </div>
            <div className="shimmer h-4 w-28 rounded-full" />
          </div>
          <div className="flex gap-3">
            <div className="shimmer h-8 w-24 rounded-full" />
            <div className="shimmer h-8 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="shimmer h-4 w-24 rounded-full" />
            <div className="shimmer h-4 w-4/5 rounded-full" />
            <div className="shimmer h-4 w-2/3 rounded-full" />
          </div>
          <div className="shimmer h-20 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}
