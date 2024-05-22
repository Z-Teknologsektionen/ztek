import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";

type TooltipWithChildrenProps = {
  tooltipChildren: JSX.Element;
  tooltipTriggerChildren: JSX.Element;
};

const TooltipWithChildren: FC<TooltipWithChildrenProps> = ({
  tooltipChildren,
  tooltipTriggerChildren,
}) => {
  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger asChild>{tooltipTriggerChildren}</TooltipTrigger>
        <TooltipContent>{tooltipChildren}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWithChildren;
