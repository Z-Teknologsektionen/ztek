import type { FC } from "react";
import { MdClose } from "react-icons/md";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import { cn } from "~/utils/utils";

const DenyTriggerButton: FC = () => {
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
            <MdClose className="fill-danger" size={15} />
            <div className="sr-only">Neka</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Neka</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DenyTriggerButton;
