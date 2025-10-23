"use client";
import { MouseEvent, useEffect, useRef, useState, type FC } from "react";

import BooleanCell from "~/components/columns/boolean-cell";
import { Button } from "~/components/ui/button";

const CopyButton: FC<{ value: string; timeout?: number }> = ({
  value,
  timeout = 2000,
}) => {
  const [copied, setCopied] = useState<boolean>(false); // hook for `copied` state (determines button text)
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null); // ref for id of JS timer (return type of setTimeout is wierd, so it's referenced implicitly)

  const reset = (): void => {
    // resets FC to idle state
    setCopied(false);
    timerIdRef.current && clearTimeout(timerIdRef.current);
  };
  const copyButtonHandler = (e: MouseEvent): void => {
    if (value) {
      reset();
      setCopied(true);
      timerIdRef.current = setTimeout(reset, timeout);

      navigator.clipboard.writeText(value);
    }
  };

  useEffect(reset, [value]);
  return (
    <Button onClick={copyButtonHandler}>
      {copied ? "Kopierad" : "Kopiera"}
      <BooleanCell value={copied} />
    </Button>
  );
};

export default CopyButton;
