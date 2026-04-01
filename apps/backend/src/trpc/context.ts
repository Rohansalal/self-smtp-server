import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type {env} from '../env';

export function createContext(opts?: FetchCreateContextFnOptions) {
  const headers = opts?.req.headers;
  
  return {
    headers,
    env: process.env as env,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
