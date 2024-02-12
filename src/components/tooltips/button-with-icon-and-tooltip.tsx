import type { ButtonHTMLAttributes, FC, MouseEventHandler } from "react";
import type { IconType } from "react-icons";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/utils/utils";

type ButtonWithIconAndTooltipProps = {
  className?: string;
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
  className = "",
  size = 15,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="border-slate-300"
          disabled={disabled}
          onClick={onClick}
          size={"icon"}
          type={type}
          variant="outline"
        >
          <Icon className={cn("fill-slate-600", className)} size={size} />
          <p className="sr-only">{tooltipText}</p>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ButtonWithIconAndTooltip;
