import Image from "next/image";
import type { FC } from "react";
import { cn } from "~/utils/utils";
type ImageWithDescriptionProps = {
  alt: string;
  className?: string;
  description: string;
  descriptionClassName?: string;
  height: number;
  src: string;
  width: number;
};

const ImageWithDescription: FC<ImageWithDescriptionProps> = ({
  className,
  descriptionClassName,
  alt,
  height,
  width,
  src,
  description,
}) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Image alt={alt} height={height} src={src} width={width} />
      <p className={cn("mt-0 text-center", descriptionClassName)}>
        {description}
      </p>
    </div>
  );
};

export default ImageWithDescription;
