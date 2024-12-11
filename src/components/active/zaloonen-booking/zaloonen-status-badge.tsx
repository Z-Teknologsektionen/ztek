import type { ZaloonenBookingStatus } from "@prisma/client";
import type { FC, ReactNode } from "react";
import { Badge } from "~/components/ui/badge";
import { zaloonenBookingStatusColorClassnames } from "~/constants/zaloonen";
import { cn } from "~/utils/utils";

type ZaloonenStatusBadgeProps = {
  children: ReactNode;
  className?: string;
  status: ZaloonenBookingStatus;
};

export const ZaloonenStatusBadge: FC<ZaloonenStatusBadgeProps> = ({
  status,
  children,
  className,
}) => {
  return (
    <Badge
      className={cn(
        className,
        "bg-zDarkGray hover:bg-zDarkGray",
        zaloonenBookingStatusColorClassnames[status],
        "h-4",
      )}
    >
      {children}
    </Badge>
  );
};
