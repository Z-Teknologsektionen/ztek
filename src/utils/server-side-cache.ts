import { unstable_cache } from "next/cache";

/**
 * Wrapper function for `unstable_cache` from Next.js (older) caching system.
 * @param func Void function returning any promise. This will be called if the return was not already cached.
 * @param tags Cache invalidation tags. Call `revalidateTag` on same tag that was passed here, to clear the cached value.
 * @returns a promise for the return value of the function
 * @see https://nextjs.org/docs/app/api-reference/functions/unstable_cache
 */
export const cached = <TReturn>(
  func: () => Promise<TReturn>,
  tags: string[] | undefined,
): Promise<TReturn> => {
  return unstable_cache(func, ["cached (void) => unknown function"], {
    revalidate: false,
    tags,
  })();
};
