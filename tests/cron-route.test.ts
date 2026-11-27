import { expect, it, vi } from 'vitest';

const calls = vi.hoisted(() => [] as string[]);
vi.mock('next/cache.js', () => ({ io: async () => void calls.push('io') }));
vi.mock('../src/sift/instance.ts', () => ({
  cron: () => {
    calls.push('cron');
    return new Response(null, { status: 204 });
  },
}));

import { GET } from '../app/api/cron/route.ts';

it('keeps cron out of the build before it can open the database', async () => {
  const response = await GET(new Request('http://localhost/api/cron'));
  expect(response.status).toBe(204);
  expect(calls).toEqual(['io', 'cron']);
});
