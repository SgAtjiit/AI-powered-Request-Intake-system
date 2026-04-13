import {
  REQUEST_CATEGORIES,
  REQUEST_URGENCIES,
} from '../src/requests/schemas/request.schema';

describe('request triage configuration', () => {
  it('keeps the allowed category values aligned with the API contract', () => {
    expect(REQUEST_CATEGORIES).toEqual([
      'billing',
      'support',
      'feedback',
      'general',
    ]);
  });

  it('keeps the allowed urgency values aligned with the API contract', () => {
    expect(REQUEST_URGENCIES).toEqual(['low', 'medium', 'high']);
  });
});
