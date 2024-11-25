import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";

type ZenithMediaCardProps = {
  coverImage: string;
  title: string;
  url: string;
  year: number;
};

export const ZenithMediaCard: FC<ZenithMediaCardProps> = ({
  coverImage,
  title,
  url,
  year,
}) => {
  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url} rel="noopener noreferrer" target="_blank">
            <Image
              alt={`Omslagsbild till ${title}`}
              className="h-[187.5px] w-full object-contain object-center"
              height={187.5}
              src={coverImage}
              unselectable="on"
              width={125}
              unoptimized
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {title}, {year}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
