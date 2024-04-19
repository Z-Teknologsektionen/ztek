import dayjs from "dayjs";

export const slugifyString = (str: string): string =>
  str
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens

export const createZenithMediaFilename = ({
  title,
  filename,
}: {
  filename: string;
  title: string;
}): string => {
  const formatedDate = dayjs(new Date()).format("YYYYMMDD");
  const fileExt = filename.split(".").pop();

  return `${formatedDate}-${slugifyString(title)}.${fileExt}`;
};
