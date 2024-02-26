import type { FC } from "react";
import type { IconType } from "react-icons";
import IconWithTooltip from "~/components/tooltips/icon-with-tooltip";
import { cn } from "~/utils/utils";

type IconNextToTextProps = {
  className?: string;
  icon: IconType;
  iconClassName?: string;
  text: string;
  textFirst?: boolean;
  tooltipText: string;
};

export const IconNextToText: FC<IconNextToTextProps> = ({
  icon,
  text,
  tooltipText,
  className,
  iconClassName,
  textFirst = false,
}) => {
  return (
    <div
      className={cn(
        "flex gap-2 text-xs",
        className,
        textFirst ? "flex-row-reverse justify-end" : "flex-row",
      )}
    >
      <IconWithTooltip
        className={iconClassName}
        icon={icon}
        tooltipText={tooltipText}
      />
      <p>{text}</p>
    </div>
  );
};

export default IconNextToText;
