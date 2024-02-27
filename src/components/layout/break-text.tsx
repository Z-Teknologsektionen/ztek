import type { FC, PropsWithChildren } from "react";

import { cn } from "~/utils/utils";

type BreakTextProps = {
  className?: string;
};

const BreakText: FC<PropsWithChildren<BreakTextProps>> = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn("overflow-hidden md:text-base", className)}
      style={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </p>
  );
};

export default BreakText;
