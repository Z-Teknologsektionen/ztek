import { unstable_cache } from "next/cache";

/**
 * Wrapper function for `unstable_cache` from Next.js (older) caching system.
 * @param func Function returning any promise. This will be called if the return was not already cached. It should not capture variables, since those'll not be included in cache key.
 * @param tags Cache invalidation tags. Call `revalidateTag` on same tag that was passed here, to clear the cached value.
 * @returns a promise for the return value of the function
 * @see https://nextjs.org/docs/app/api-reference/functions/unstable_cache
 */
export const cached = <TArgs extends unknown[], TReturn>(
  func: (...args: TArgs) => Promise<TReturn>,
  tags: string[] | undefined,
): ((...args: TArgs) => Promise<TReturn>) => {
  return unstable_cache(func, ["kool af cached function :3"], {
    revalidate: 60 * 60 * 24, // if not invalidated, revalidate cache every day
    tags,
  });
};
