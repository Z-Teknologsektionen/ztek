import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
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
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className={cn("truncate", className)}>{text}</p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedStringWithTooltip;
