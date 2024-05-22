import type { ButtonHTMLAttributes, FC, MouseEventHandler } from "react";
import type { IconType } from "react-icons";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import { cn } from "~/utils/utils";

type ButtonWithIconAndTooltipProps = {
  classNameButton?: string;
  classNameIcon?: string;
  disabled?: boolean;
  icon: IconType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: number;
  tooltipText: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const ButtonWithIconAndTooltip: FC<ButtonWithIconAndTooltipProps> = ({
  icon: Icon,
  tooltipText,
  classNameIcon = "",
  classNameButton = "",
  size = 15,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn("border-slate-300", classNameButton)}
            disabled={disabled}
            onClick={onClick}
            size={"icon"}
            type={type}
            variant="outline"
          >
            <Icon className={cn("fill-zBlack", classNameIcon)} size={size} />
            <p className="sr-only">{tooltipText}</p>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonWithIconAndTooltip;
