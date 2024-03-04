import type { FC } from "react";
import TruncatedText from "~/components/layout/truncated-text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";

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
          <TruncatedText className={className} text={text} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedStringWithTooltip;
