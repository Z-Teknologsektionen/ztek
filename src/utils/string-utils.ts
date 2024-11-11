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
  filename,
  ...props
}: {
  filename: string;
  order: number;
  title: string;
  year: number;
}): string => {
  const uploadDateString = dayjs(new Date()).format("YYYYMMDD");
  const fileExt = filename.split(".").pop();

  if (!fileExt || uploadDateString?.length !== 8)
    throw new Error("Unknown format filename");

  return getZenithMediaFilename({
    fileExtension: fileExt,
    uploadDateString,
    ...props,
  });
};

export const updateZenithMediaFilename = ({
  oldFilename,
  ...props
}: {
  oldFilename: string;
  order: number;
  title: string;
  year: number;
}): string => {
  const fileExt = oldFilename.split(".").pop();
  const uploadDateString = oldFilename.split("-").at(0);

  if (!fileExt || uploadDateString?.length !== 8)
    throw new Error("Unknown format on old filename");

  return getZenithMediaFilename({
    fileExtension: fileExt,
    uploadDateString,
    ...props,
  });
};

export const getZenithMediaFilename = ({
  order,
  title,
  uploadDateString,
  year,
  fileExtension,
}: {
  fileExtension: string;
  order: number;
  title: string;
  uploadDateString: string;
  year: number;
}): string => {
  const formatedTitle = slugifyString(title);
  const formatedOrder = order.toString().padStart(3, "0");

  // Format: {uploadDate}-{title}-{year}-{order}
  return `${uploadDateString}-${formatedTitle}-${year}-${formatedOrder}.${fileExtension}`;
};
