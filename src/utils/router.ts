import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const useRouterHelpers = () => {
  const router = useRouter();

  const replaceQuery = async (
    key: string,
    value: string[] | string | undefined
  ): Promise<void> => {
    await router.replace({ query: { ...router.query, [key]: value } });
    return;
  };

  const clearQuery = async (): Promise<void> => {
    await router.replace({ query: {} });
    return;
  };
  return { clearQuery, replaceQuery };
};
