import type { FC } from "react";
import { MdDelete } from "react-icons/md";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/utils/utils";

const DeleteTriggerButton: FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "mx-2 h-6",
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
  );
};

export default DeleteTriggerButton;
