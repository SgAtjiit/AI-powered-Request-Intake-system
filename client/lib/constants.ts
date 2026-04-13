export const CATEGORY_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Billing', value: 'billing' },
  { label: 'Support', value: 'support' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'General', value: 'general' },
] as const;

export const REQUEST_CATEGORIES = CATEGORY_OPTIONS.filter(
  (option) => option.value !== 'all',
).map((option) => option.value);

export type RequestCategory = (typeof REQUEST_CATEGORIES)[number];
export type CategoryFilter = (typeof CATEGORY_OPTIONS)[number]['value'];
