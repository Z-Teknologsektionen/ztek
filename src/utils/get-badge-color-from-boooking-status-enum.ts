import { ZaloonenBookingStatus } from "@prisma/client";

export const getBadgeColorFromBookingStatusEnum = (
  type: ZaloonenBookingStatus,
): string => {
  switch (type) {
    case ZaloonenBookingStatus.APPROVED:
      return "success";
    case ZaloonenBookingStatus.DENIED:
      return "danger";
    case ZaloonenBookingStatus.REQUESTED:
      return "warning";
    default:
      return "zLightGray";
  }
};
