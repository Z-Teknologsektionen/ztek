import type { FC } from "react";
import { MdEdit } from "react-icons/md";
import { buttonVariants } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/utils/utils";

const EditTriggerButton: FC = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "mx-2 h-6",
          )}
        >
          <MdEdit className="fill-waring" size={15} />
          <div className="sr-only">Redigera</div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Redigera</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EditTriggerButton;
