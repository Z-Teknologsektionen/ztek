import type { ZaloonenBookingStatus } from "@prisma/client";
import type { FC, ReactNode } from "react";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/utils/utils";

type ZaloonenStatusBadgeProps = {
  children: ReactNode;
  status: ZaloonenBookingStatus;
};

export const ZaloonenStatusBadge: FC<ZaloonenStatusBadgeProps> = ({
  status,
  children,
}) => {
  const statusColor = {
    DENIED: "bg-red-600 hover:bg-red-600",
    APPROVED: "bg-green-600 hover:bg-green-600",
    REQUESTED: "bg-yellow-600 hover:bg-yellow-600",
    ON_HOLD: "bg-blue-600 hover:bg-blue-600",
    COMPLETED: "bg-gray-600 hover:bg-gray-600",
  };

  return (
    <Badge
      className={cn(
        "bg-zDarkGray hover:bg-zDarkGray",
        statusColor[status],
        "h-4",
      )}
    >
      {children}
    </Badge>
  );
};
