import type { FC } from "react";
import { MdCheck } from "react-icons/md";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import { cn } from "~/utils/utils";

const ApproveTriggerButton: FC = () => {
  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "mx-2 h-6 group-disabled:cursor-not-allowed group-disabled:opacity-50",
            )}
          >
            <MdCheck className="fill-success" size={15} />
            <div className="sr-only">Godkänn</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Godkänn</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ApproveTriggerButton;
