// Each minute: Vercel Cron (vercel.json), or `mild run`. See docs/runtime.md.
import { io } from 'next/cache.js';
import { cron } from '../../../src/sift/instance.ts';

export const maxDuration = 300;

// Checking the secret opens the local database, which must wait for a request rather than Next's build.
export const GET = async (request: Request) => {
  await io();
  return cron(request);
};
