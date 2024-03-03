import Image from "next/image";
import type { FC } from "react";
import { cn } from "~/utils/utils";
type ImageWithCreditProps = {
  alt: string;
  className?: string;
  height: number;
  imageClassName?: string;
  photoCommittee: string;
  photographer: string;
  src: string;
  width: number;
};

const ImageWithCredit: FC<ImageWithCreditProps> = ({
  className,
  imageClassName,
  height,
  alt,
  width,
  src,
  photographer,
  photoCommittee,
}) => {
  return (
    <div className={cn("rounded", className)}>
      <Image
        alt={alt}
        className={cn("rounded", imageClassName)}
        height={height}
        src={src}
        width={width}
      />
      <p className="mt-2 text-center">
        Foto: {photographer}/{photoCommittee}
      </p>
    </div>
  );
};

export default ImageWithCredit;
