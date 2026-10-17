"use client";
import type { FC, MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import BooleanCell from "~/components/columns/boolean-cell";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { TOOLTIP_DELAY_MS } from "~/constants/delay-constants";
import { cn } from "~/utils/utils";

/**
 * Button for copying a string value to user's clipboard.
 * @param value - string to be copied, or null to disable the button
 * @param tooltip - React to display in tooltip. Tooltip won't display if this parameter is falsy.
 * @param timeout - Duration to show "Copied", after click
 */
const CopyButton: FC<{
  timeout?: number;
  tooltip?: ReactNode;
  value: string | null;
}> = ({ value, tooltip = null, timeout = 2000 }) => {
  const [copied, setCopied] = useState<boolean>(false); // hook for `copied` state (determines button text)
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null); // ref for id of JS timer (return type of setTimeout is wierd, so it's referenced implicitly)

  // resets FC to idle state
  const reset = (): void => {
    setCopied(false);
    timerIdRef.current && clearTimeout(timerIdRef.current);
  };

  // copies to clipboard, and sets timer
  const copyButtonHandler = (_: MouseEvent): void => {
    if (value) {
      reset();
      setCopied(true);
      timerIdRef.current = setTimeout(reset, timeout);

      navigator.clipboard.writeText(value).catch(reset);
    }
  };

  // reset timer on value change
  useEffect(reset, [value]);
  return (
    <TooltipProvider delayDuration={TOOLTIP_DELAY_MS}>
      <Tooltip>
        <TooltipTrigger>
          <Button
            className={
              cn(!value && "bg-zDarkGray") /* Grey-out if no content */
            }
            onClick={copyButtonHandler}
          >
            {copied ? "Kopierad" : "Kopiera"}
            {copied && <BooleanCell value={true} />}
          </Button>
        </TooltipTrigger>

        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
