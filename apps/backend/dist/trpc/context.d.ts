import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
export declare function createContext(opts?: FetchCreateContextFnOptions): {
    headers: Headers;
    env: env;
};
export type Context = Awaited<ReturnType<typeof createContext>>;
//# sourceMappingURL=context.d.ts.map