import type { FC } from "react";
import type { IconType } from "react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/utils/utils";

type IconWithTooltipProps = {
  className?: string;
  icon: IconType;
  size?: number;
  tooltipText: string;
};

const IconWithTooltip: FC<IconWithTooltipProps> = ({
  icon: Icon,
  tooltipText,
  className = "",
  size = 15,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icon className={cn("fill-zBlack", className)} size={size} />
          <p className="sr-only">{tooltipText}</p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconWithTooltip;
