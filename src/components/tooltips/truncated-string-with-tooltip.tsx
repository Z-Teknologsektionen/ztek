import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/utils/utils";

type TruncatedStringWithTooltipProps = {
  className?: string;
  text: string;
};

const TruncatedStringWithTooltip: FC<TruncatedStringWithTooltipProps> = ({
  text,
  className = "",
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p className={cn("truncate", className)}>{text}</p>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TruncatedStringWithTooltip;
