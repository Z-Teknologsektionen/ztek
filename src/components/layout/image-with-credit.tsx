import Image from "next/image";
import type { FC } from "react";
import { cn } from "~/utils/utils";
type ImageWithCreditProps = {
  alt: string;
  className?: string;
  height: number;
  photoCommittee: string;
  photographer: string;
  src: string;
  width: number;
};

const ImageWithCredit: FC<ImageWithCreditProps> = ({
  className,
  height,
  alt,
  width,
  src,
  photographer,
  photoCommittee,
}) => {
  return (
    <>
      <Image
        alt={alt}
        className={cn("rounded", className)}
        height={height}
        src={src}
        width={width}
      />
      <p className="mt-2 text-center">
        Foto: {photographer}/{photoCommittee}
      </p>
    </>
  );
};

export default ImageWithCredit;
