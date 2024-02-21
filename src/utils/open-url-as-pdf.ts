export const openUrlAsPdf = ({
  url,
  isPDF,
}: {
  isPDF: boolean;
  url: string;
}): string => (isPDF ? `https://docs.google.com/viewer?url=${url}` : url);
