import Image, { type ImageProps } from "next/image";
import { type FC } from "react";
import { cn } from "~/utils/utils";

interface ICommitteeImage extends Omit<ImageProps, "src"> {
  filename: string | null | undefined;
}

export const CommitteeImage: FC<ICommitteeImage> = ({
  filename,
  alt,
  className = "",
  height = 256,
  width = 256,
  quality = 95,
  ...rest
}) => {
  const src =
    typeof filename === "string" && filename !== "" ? filename : "/logo.png";
  return (
    <Image
      alt={alt}
      className={cn(
        "mx-auto h-64 w-64 rounded object-cover object-center text-transparent",
        "before:content-['']",
        "after:relative after:-top-6 after:z-10 after:grid after:h-full after:max-h-64 after:min-h-[8rem] after:w-full after:place-content-center after:truncate after:text-center after:text-xl after:text-black after:content-['Bild_saknas']",
        className,
      )}
      height={height}
      quality={quality}
      src={src}
      width={width}
      {...rest}
    />
  );
};
