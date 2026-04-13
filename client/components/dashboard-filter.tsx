'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CATEGORY_OPTIONS, CategoryFilter } from '@/lib/constants';

interface DashboardFilterProps {
  selectedCategory: CategoryFilter;
}

export function DashboardFilter({ selectedCategory }: DashboardFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCategory = (category: CategoryFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORY_OPTIONS.map((option) => {
        const isActive = selectedCategory === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setCategory(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
