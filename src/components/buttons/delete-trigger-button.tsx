import type { FC } from "react";
import { MdDelete } from "react-icons/md";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import { cn } from "~/utils/utils";

const DeleteTriggerButton: FC = () => {
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
            <MdDelete className="fill-danger" size={15} />
            <div className="sr-only">Radera</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Radera</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DeleteTriggerButton;
